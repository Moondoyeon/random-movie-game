export type SlotOption = 'country' | 'year' | 'type';
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
  boxOfficeResult: {
    boxofficeType: string;
    weeklyBoxOfficeList: Movie[];
    showRange: string;
    yearWeekTime: string;
  };
}
