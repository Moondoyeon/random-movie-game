import { MovieApiParams } from 'types/game';
import { getRandomMovieData } from './http';
export class CacheApi {
  private static movieCacheStorage = 'RANDOM_MOVIE_GAME_CACHE';
  private static baseUrl = process.env.REACT_APP_BASE_URL;
  private static defaultParams = `key=${process.env.REACT_APP_KOBIS_API_KEY}&weekGb=0&itemPerPage=5`;
  private static X_KOBIS_Response_Time = 'x-kobis-response-time';
  private static usage = 0;
  private static quota = 0;

  static async getMovieData(params: MovieApiParams) {
    const url = `${this.baseUrl}?${this.defaultParams}&targetDt=${params.targetDt}&repNationCd=${params.repNationCd}&multiMovieYn=${params.multiMovieYn}`;
    const cache = await caches.open(this.movieCacheStorage); // 서비스워커 동작시작? 설치한 필요있나?.
    const cachedResponse = await cache.match(url);

    // 캐시 사용량 확인하여 기준 초과시 캐시삭제
    this.removeCacheForStorageAvailable(cache);

    // 캐시가 만료됐거나, 매치된 url이 없으면 네트워크 요청
    if ((await this.isCacheExpired(cachedResponse)) || !cachedResponse) {
      await cache.delete(url);
      return this.FetchDataAddCacheHeader(cache, params, url);
    }

    // 캐시가 만료되지 않았으면 캐시 반환
    return JSON.parse(await cachedResponse.text()).data;
  }

  // 200응답에 캐시 유효기간 헤더를 추가해 반환
  private static async FetchDataAddCacheHeader(
    cache: Cache,
    params: MovieApiParams,
    url: string,
  ) {
    const fetchedResponse = await getRandomMovieData(params); // 헤더가 있는 응답을 받아야함
    const newHeaders = new Headers();
    for (const [header, value] of Object.entries(fetchedResponse.headers)) {
      newHeaders.append(header, value);
    }
    newHeaders.append(this.X_KOBIS_Response_Time, String(new Date().getTime()));
    // 캐시 저장
    cache.put(
      url,
      new Response(JSON.stringify(fetchedResponse), {
        headers: newHeaders,
      }),
    );
    return fetchedResponse.data;
  }

  // 현재시간과 캐시헤더시간 비교해 캐시만료 여부확인
  private static async isCacheExpired(cachedResponse: Response | undefined) {
    const ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
    const today = new Date().getTime();
    const fetchedTime = Number(
      cachedResponse?.headers?.get(this.X_KOBIS_Response_Time),
    );
    return today - fetchedTime > ONE_WEEK;
  }

  // 할당량의 30%이상 캐시된 경우, 캐시데이터 전부 삭제
  private static async removeCacheForStorageAvailable(cache: Cache) {
    navigator.storage
      .estimate()
      .then(estimate => {
        this.usage = estimate.usage!; // 웹앱의 사용량
        this.quota = estimate.quota!; // 할당량: 브라우저가 웹앱에 할당한 최대 저장가능한 용량
      })
      .catch(err => {
        console.error('from movie cache api class');
        throw err;
      });

    if ((this.usage / this.quota) * 100 > 0.3) {
      (await cache.keys()).forEach(req => cache.delete(req)); // Deno 에서만 동작 안함
    }
  }
}
