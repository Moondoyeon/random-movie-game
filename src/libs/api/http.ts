import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    key: process.env.REACT_APP_KOBIS_API_KEY,
    weekGb: 0,
    itemPerPage: 5,
  },
  timeout: 3000,
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

  private static async isCacheExpired(cachedResponse: Response | undefined) {
    const ONE_YEAR_MILLISECONDS = 31536000000;
    const today = new Date().getTime();
    const fetchedTime = Number(
      cachedResponse?.headers?.get(this.X_Fetch_Response_Time),
    );

    if (!fetchedTime || today - fetchedTime > ONE_YEAR_MILLISECONDS) {
      return true;
    }

    return false;
  }

  private static async fetchData(
    cache: Cache,
    params: ParamsType,
    url: string,
  ) {
    const fetchedData = await http.get('', params);
    const newHeaders = new Headers(fetchedData.headers);
    newHeaders.append(this.X_Fetch_Response_Time, String(new Date().getTime()));

    cache.put(
      url,
      new Response(JSON.stringify(fetchedData), {
        headers: newHeaders,
      }),
    );

    return fetchedData;
  }

  private static async getValidData(
    cache: Cache,
    params: ParamsType,
    url: string,
  ) {
    const cachedData = await cache.match(url);

    if (!cachedData || (await this.isCacheExpired(cachedData))) {
      return this.fetchData(cache, params, url);
    }

    return JSON.parse(await cachedData.text());
  }

  static async getMovieList(params: ParamsType) {
    const url = `${this.baseUrl}?${this.defaultParams}&targetDt=${params.targetDt}&repNationCd=${params.repNationCd}&multiMovieYn=${params.multiMovieYn}`;
    const movieCache = await caches.open(this.movieCacheStorage);

    return await this.getValidData(movieCache, params, url);
  }
}
