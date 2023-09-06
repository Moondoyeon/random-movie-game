import { SlotOptionParams } from 'libs/types/game';
import { getRandomMovieData } from './http';
// import { httpForTest } from './http';
export class CacheApi {
  private static movieCacheStorage = 'CACHE_STORAGE_MOVIE';
  private static baseUrl = process.env.REACT_APP_BASE_URL;
  private static defaultParams = `key=${process.env.REACT_APP_KOBIS_API_KEY}&weekGb=0&itemPerPage=5`;
  private static X_Fetch_Response_Time = 'X-Fetch-Response-Time';

  static async getMovieData(params: SlotOptionParams) {
    const paramsForCache = {
      targetDt: '20200516',
      multiMovieYn: 'N',
      repNationCd: 'K',
    };
    params = paramsForCache;
    const url = `${this.baseUrl}?${this.defaultParams}&targetDt=${params.targetDt}&repNationCd=${params.repNationCd}&multiMovieYn=${params.multiMovieYn}`;
    const cache = await caches.open(this.movieCacheStorage);
    const cachedResponse = await cache.match(url);

    if ((await this.isCacheExpired(cachedResponse)) || !cachedResponse) {
      await cache.delete(url);
      return this.fetchData(cache, params, url);
    }

    return JSON.parse(await cachedResponse.text());
  }

  private static async fetchData(
    cache: Cache,
    params: SlotOptionParams,
    url: string,
  ) {
    // const fetchedResponse = await httpForTest.get('', params);
    const fetchedResponse = await getRandomMovieData(params);
    const newHeaders = new Headers();
    for (const [header, value] of Object.entries(fetchedResponse.headers)) {
      newHeaders.append(header, value);
    }
    newHeaders.append(this.X_Fetch_Response_Time, String(new Date().getTime()));

    cache.put(
      url,
      new Response(JSON.stringify(fetchedResponse), {
        headers: newHeaders,
      }),
    );

    return fetchedResponse.data;
  }

  private static async isCacheExpired(cachedResponse: Response | undefined) {
    const shortForCache = 1000 * 3;
    // const ONE_HOUR = 1000 * 60 * 60;
    const today = new Date().getTime();

    const fetchedTime = Number(
      cachedResponse?.headers?.get(this.X_Fetch_Response_Time),
    );

    return today - fetchedTime > shortForCache;
  }
}
