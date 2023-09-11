import { CacheApi } from 'libs/api/Cache';
import { httpForTest } from 'libs/api/http';
import { MovieData } from 'libs/types/game';
import { initNum } from 'libs/utils';
import { useEffect, useState } from 'react';

interface Props {
  selected: {
    [key: string]: string;
  };
}
function useMovieData({ selected }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<MovieData | null>(null);

  const formatDate = () => {
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const RANDOM_DAY = ['06', '13', '20', '27'];
    const day = RANDOM_DAY[Math.floor(Math.random() * 4)];
    const date = `${selected.year}${month}${day}`;
    return date;
  };

  const getMovieData = async () => {
    try {
      // yarn start && browser msw 실행 및 실제 네트워크 요청하는 개발환경 에서 사용되는 로직
      // browser msw 실행해도 되는 이유) msw는 어차피 요청 url 만 가로채서 요청핸들러에 정의해놓은 url과
      // 동일하기만 하면 mocked Response를 응답해주기 때문
      setIsLoading(true);
      if (
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'production'
      ) {
        const response = await CacheApi.getMovieData({
          targetDt: formatDate(),
          multiMovieYn: selected.type,
          repNationCd: selected.country,
        });
        if (response) setData(response);
      }
      // yarn test 에서 사용되는 요청 로직 for Jest in Node
      if (process.env.NODE_ENV === 'test') {
        const mockedResponse = await httpForTest.get('', {
          targetDt: formatDate(),
          multiMovieYn: selected.type,
          repNationCd: selected.country,
        });
        if (mockedResponse) setData(mockedResponse);
      }
      setIsLoading(false);
    } catch (error: unknown) {
      setIsError(true);
      console.log(error);
    }
  };
  useEffect(() => {
    if (selected.country && selected.type && selected.year) {
      getMovieData();
    }
  }, [selected.country, selected.type, selected.year]);

  const resetDataAndLoading = () => {
    setData(null);
    setIsLoading(false);
  };

  const { boxOfficeResult: { weeklyBoxOfficeList: movieList = [] } = {} } =
    data || {};
  const selectedMovie = movieList && movieList[initNum(movieList?.length)];
  const country = selected.country === 'K' ? '국내' : '외국';
  const type = selected.type === 'N' ? '상업영화' : '다양성영화';

  return {
    selectedMovie,
    country,
    type,
    isLoading,
    isError,
    resetDataAndLoading,
  };
}

export default useMovieData;
