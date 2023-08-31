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
    const fetchTime = Number(
      cachedResponse?.headers?.get(this.X_Fetch_Response_Time),
    );
    const today = new Date().getTime();

    return !fetchTime ? false : today - fetchTime > ONE_YEAR_MILLISECONDS;
  }

  private static async fetchResponse(
    cache: Cache,
    params: ParamsType,
    url: string,
  ) {
    const fetchedResponse = await http.get('', params);
    const newHeads = new Headers(fetchedResponse.headers);
    newHeads.append(this.X_Fetch_Response_Time, String(new Date().getTime()));

    cache.put(
      url,
      new Response(JSON.stringify(fetchedResponse), {
        headers: newHeads,
      }),
    );

    return fetchedResponse;
  }

  private static async getValidResponse(
    cache: Cache,
    params: ParamsType,
    url: string,
  ) {
    const cachedResponse = await cache.match(url);

    return !cachedResponse
      ? await this.fetchResponse(cache, params, url)
      : (await this.isCacheExpired(cachedResponse))
      ? await this.fetchResponse(cache, params, url)
      : await JSON.parse(await cachedResponse.text());
  }

  static async getMovieList(params: ParamsType) {
    const url = `${this.baseUrl}?${this.defaultParams}&targetDt=${params.targetDt}&repNationCd=${params.repNationCd}&multiMovieYn=${params.multiMovieYn}`;
    const movieCache = await caches.open(this.movieCacheStorage);

    return await this.getValidResponse(movieCache, params, url);
  }
}
