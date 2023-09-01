import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    key: process.env.REACT_APP_KOBIS_API_KEY,
    weekGb: 0,
    itemPerPage: 5,
  },
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

type ParamsType = {
  targetDt: string;
  repNationCd: string;
  multiMovieYn: string;
};

export const http = {
  get: function get(url: string, params: ParamsType) {
    return axiosInstance.get(url, { params }).then(response => response.data);
  },
};

export class CacheApi {
  private static movieCacheStorage = 'CACHE_STORAGE_MOVIE';
  private static baseUrl = process.env.REACT_APP_BASE_URL;
  private static defaultParams = `key=${process.env.REACT_APP_KOBIS_API_KEY}&weekGb=0&itemPerPage=5`;
  private static X_Fetch_Response_Time = 'X-Fetch-Response-Time';

  static async getMovieData(params: ParamsType) {
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
    params: ParamsType,
    url: string,
  ) {
    const fetchedResponse = await http.get('', params);
    const newHeaders = new Headers(fetchedResponse.headers);
    newHeaders.append(this.X_Fetch_Response_Time, String(new Date().getTime()));

    cache.put(
      url,
      new Response(JSON.stringify(fetchedResponse), {
        headers: newHeaders,
      }),
    );

    return fetchedResponse;
  }

  private static async isCacheExpired(cachedResponse: Response | undefined) {
    const ONE_MONTH_MILLISECONDS = 2592000000;
    const today = new Date().getTime();
    const fetchedTime = Number(
      cachedResponse?.headers?.get(this.X_Fetch_Response_Time),
    );

    return today - fetchedTime > ONE_MONTH_MILLISECONDS;
  }
}
