import Axios from 'axios';
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

// type SlotOption = {
//   targetDt: string;
//   repNationCd: string;
//   multiMovieYn: string;
// };

export type ParamsType = {
  [key: string]: string;
};
export const http = {
  get: async function get(url: string, params?: ParamsType) {
    const res = await axios.get(url, { params });
    return res.data;
  },
};
