import { rest } from 'msw';
const MOCK_MOVIE_DATA = {
  boxOfficeResult: {
    boxofficeType: '[mocked] 주말 박스오피스',
    showRange: '20210514~20210516',
    yearWeekTime: '202119',
    weeklyBoxOfficeList: [
      {
        rnum: '1',
        rank: '1',
        rankInten: '0',
        rankOldAndNew: 'OLD',
        movieCd: '20193068',
        movieNm: '[mocked] 비와 당신의 이야기',
        openDt: '2021-04-28',
        salesAmt: '272877330',
        salesShare: '54.4',
        salesInten: '-164072410',
        salesChange: '-37.5',
        salesAcc: '3203457430',
        audiCnt: '27778',
        audiInten: '-17547',
        audiChange: '-38.7',
        audiAcc: '346994',
        scrnCnt: '616',
        showCnt: '3889',
      },
    ],
  },
};

export const getMockMovieData: Parameters<typeof rest.get>[1] = (
  _,
  res,
  ctx,
) => {
  return res(ctx.status(200, 'ok'), ctx.json(MOCK_MOVIE_DATA));
};

export const get404Error: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(ctx.status(404));
};

export const get500Error: Parameters<typeof rest.get>[1] = (_, res, ctx) => {
  return res(ctx.status(500));
};

export const getNetworkError: Parameters<typeof rest.get>[1] = (_, res) => {
  return res.networkError('network');
};

export const handlers = [
  rest.get('/test', getMockMovieData),
  rest.get('/notFoundError', get404Error),
  rest.get('/serverError', get500Error),
  rest.get('/networkError', getNetworkError),
];
