import axios from 'axios';
import { MovieApiResponse, MovieApiParams } from 'types/game';
export const axiosInstance = axios.create({
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

export const httpForTest = {
  get: async function get(url: string) {
    return await axios.get(url).then(res => res.data);
  },
};
export const http = {
  get: async function get<Response = unknown>(url: string, params?: unknown) {
    return await axiosInstance.get<Response>(url, { params });
  },
};
export function getRandomMovieData(params: MovieApiParams) {
  return http.get<MovieApiResponse>('', params);
}
