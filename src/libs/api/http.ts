import axios from 'axios';
import { MovieData } from 'libs/types/game';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    key: process.env.REACT_APP_KOBIS_API_KEY,
  },
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axiosInstance.interceptors.request.use(config => {
//   console.log(`request: `, config);
//   return config;
// });

// axiosInstance.interceptors.response.use(
//   response => {
//     // Log the response
//     // console.log('Response:', response);
//     return response;
//   },
//   error => {
//     // console.error('Error:', error);
//     return Promise.reject(error);
//   },
// );

type ParamsType = {
  [key: string]: string | number;
};

export const http = {
  get: function get<Response = MovieData>(url: string, params: ParamsType) {
    return axiosInstance.get<Response>(url, { params }).then(res => res.data);
  },
};
