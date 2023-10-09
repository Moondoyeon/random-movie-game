import { rest } from 'msw';
const movies = {
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
      // {
      //   rnum: '2',
      //   rank: '2',
      //   rankInten: '0',
      //   rankOldAndNew: 'OLD',
      //   movieCd: '20194501',
      //   movieNm: '[mocked] 내일의 기억',
      //   openDt: '2021-04-21',
      //   salesAmt: '160223160',
      //   salesShare: '31.9',
      //   salesInten: '-42315960',
      //   salesChange: '-20.9',
      //   salesAcc: '2936517040',
      //   audiCnt: '15681',
      //   audiInten: '-4628',
      //   audiChange: '-22.8',
      //   audiAcc: '323825',
      //   scrnCnt: '386',
      //   showCnt: '1773',
      // },
      // {
      //   rnum: '3',
      //   rank: '3',
      //   rankInten: '0',
      //   rankOldAndNew: 'OLD',
      //   movieCd: '20217825',
      //   movieNm: '[mocked] 베르테르',
      //   openDt: '2021-05-05',
      //   salesAmt: '30417000',
      //   salesShare: '6.1',
      //   salesInten: '-33040000',
      //   salesChange: '-52.1',
      //   salesAcc: '207031000',
      //   audiCnt: '1719',
      //   audiInten: '-1873',
      //   audiChange: '-52.1',
      //   audiAcc: '11693',
      //   scrnCnt: '41',
      //   showCnt: '178',
      // },
    ],
  },
};

export const getMockMovieData: Parameters<typeof rest.get>[1] = (
  _,
  res,
  ctx,
) => {
  return res(ctx.status(200, 'ok'), ctx.json(movies));
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
  rest.get(`${process.env.REACT_APP_BASE_URL}`, getMockMovieData),
  rest.get(`${process.env.REACT_APP_BASE_URL}`, get404Error),
  rest.get(`${process.env.REACT_APP_BASE_URL}`, get500Error),
  rest.get(`${process.env.REACT_APP_BASE_URL}`, getNetworkError),
];
