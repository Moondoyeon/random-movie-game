import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_URL}`,
  params: {
    key: process.env.REACT_APP_KOBIS_API_KEY,
  },
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
  },
});

type ParamsType = {
  [key: string]: string | number;
};

export const http = {
  get: function get<Response = unknown>(url: string, params: ParamsType) {
    return axiosInstance.get<Response>(url, { params }).then(res => res.data);
  },
};
