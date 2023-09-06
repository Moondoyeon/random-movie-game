import { AxiosResponseHeaders } from 'axios';

export type SelectedOption = 'country' | 'year' | 'type';
export interface SlotOptionParams {
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
export interface MovieData {
  headers: AxiosResponseHeaders;
  boxOfficeResult: {
    boxofficeType: string;
    weeklyBoxOfficeList: Movie[];
    showRange: string;
    yearWeekTime: string;
  };
}
