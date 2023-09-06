import Axios from 'axios';
import { MovieData, SlotOptionParams } from 'libs/types/game';
export const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    key: process.env.REACT_APP_KOBIS_API_KEY,
    weekGb: 0,
    itemPerPage: 5,
  },
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export type ParamsType = {
  [key: string]: string;
};

export const httpForTest = {
  get: async function get(url: string, params?: SlotOptionParams) {
    return await axios.get('', { params }).then(res => res.data);
  },
};

export const httpForCacheHeader = {
  get: async function get<Response = unknown>(
    url: string,
    params?: SlotOptionParams,
  ) {
    return await axios.get<Response>(url, { params });
  },
};

export function getRandomMovieData(params: SlotOptionParams) {
  return httpForCacheHeader.get<MovieData>('', params);
}
