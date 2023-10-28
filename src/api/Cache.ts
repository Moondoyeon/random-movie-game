import { MovieApiParams } from 'types/game';
import { getRandomMovieData } from './http';
export class CacheApi {
  private static movieCacheStorage = 'CACHE_STORAGE_MOVIE';
  private static baseUrl = process.env.REACT_APP_BASE_URL;
  private static defaultParams = `key=${process.env.REACT_APP_KOBIS_API_KEY}&weekGb=0&itemPerPage=5`;
  private static X_KOBIS_Response_Time = 'x-kobis-response-time';

  // 매치된 url이 없거나 캐시만료시, 새 네트워크 요청
  // 캐시된 url이거나 만료된 캐시가 아니면, 캐시 반환
  static async getMovieData(params: MovieApiParams) {
    const url = `${this.baseUrl}?${this.defaultParams}&targetDt=${params.targetDt}&repNationCd=${params.repNationCd}&multiMovieYn=${params.multiMovieYn}`;
    const cache = await caches.open(this.movieCacheStorage); // 서비스워커 동작시작? 설치한 필요있나?.
    const cachedResponse = await cache.match(url);
    console.log('cachedResponse', cachedResponse);
    if ((await this.isCacheExpired(cachedResponse)) || !cachedResponse) {
      await cache.delete(url);
      return this.FetchDataAddCacheHeader(cache, params, url);
    }
    return JSON.parse(await cachedResponse.text()).data;
  }

  // 200응답에 커스텀캐시헤더를 추가해 반환
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
    const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;
    const today = new Date().getTime();
    const fetchedTime = Number(
      cachedResponse?.headers?.get(this.X_KOBIS_Response_Time),
    );
    return today - fetchedTime > ONE_MONTH;
  }
}
