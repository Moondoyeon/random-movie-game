import { AxiosResponseHeaders } from 'axios';
export type SlotOption = Record<string, Record<string, string>>;
export type SelectedSlotOption = Record<string, string>;
export interface MovieApiParams {
  targetDt: string;
  multiMovieYn: string;
  repNationCd: string;
}
export interface Movie {
  audiAcc: string;
  audiChange: string;
  audiCnt: string;
  audiInten: string;
  movieCd: string;
  movieNm: string;
  openDt: string;
  rank: string;
  rankInten: string;
  rankOldAndNew: string;
  rnum: string;
  salesAcc: string;
  salesAmt: string;
  salesChange: string;
  salesInten: string;
  salesShare: string;
  scrnCnt: string;
  showCnt: string;
}

export interface MovieApiResponse {
  headers: AxiosResponseHeaders;
  data: MovieData;
  request: XMLHttpRequest;
  status: number;
  statusText: string;
  config: unknown;
}

export interface MovieData {
  boxOfficeResult: {
    boxofficeType: string;
    weeklyBoxOfficeList: Movie[];
    showRange: string;
    yearWeekTime: string;
  };
}
