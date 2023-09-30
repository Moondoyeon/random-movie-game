import { CacheApi } from 'libs/api/Cache';
import { httpForTest } from 'libs/api/http';
import { MovieData } from 'libs/types/game';
import { initNum } from 'libs/utils';
import { promiseWrapper } from 'libs/utils/promiseWrapper';
import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';

function useMovieData({ selected }: { selected: Record<string, string> }) {
  const [movieList, setMovieList] = useState<MovieData | null>(null);
  const { showBoundary } = useErrorBoundary();

  const formatDate = () => {
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const RANDOM_DAY = ['06', '13', '20', '27'];
    const day = RANDOM_DAY[Math.floor(Math.random() * 4)];
    const date = `${selected.year}${month}${day}`;
    return date;
  };

  const getMovieList = async () => {
    try {
      if (
        // yarn start && browser msw 실행 및 실제 네트워크 요청하는 개발환경 에서 사용되는 로직
        // browser msw 실행해도 되는 이유) msw는 어차피 요청 url 만 가로채서 요청핸들러에 정의해놓은 url과
        // 동일하기만 하면 mocked Response를 응답해주기 때문
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'production'
      ) {
        return await CacheApi.getMovieData({
          targetDt: formatDate(),
          multiMovieYn: selected.type,
          repNationCd: selected.country,
        });
      }
      if (process.env.NODE_ENV === 'test') {
        // yarn test 에서 사용되는 요청 로직 for Jest in Node
        return await httpForTest.get('', {
          targetDt: formatDate(),
          multiMovieYn: selected.type,
          repNationCd: selected.country,
        });
      }
    } catch (error) {
      showBoundary(error);
    }
  };

  useEffect(() => {
    if (selected.country && selected.type && selected.year) {
      const promise = getMovieList();
      setMovieList(promiseWrapper(promise));
    }
  }, [selected.country, selected.type, selected.year]);

  const resetMovieData = () => {
    setMovieList(null);
  };

  const movies = movieList?.boxOfficeResult.weeklyBoxOfficeList;
  const selectedMovie = movies && movies[initNum(movies.length)].movieNm;

  return {
    selectedMovie,
    resetMovieData,
  };
}

export default useMovieData;
