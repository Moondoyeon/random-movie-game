import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { CacheApi } from 'api/Cache';
import { httpForTest } from 'api/http';
import { MovieData } from 'types/game';
import { initNum } from 'utils';
import { promiseWrapper } from 'utils/promiseWrapper';

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
  const getTestMovieList = async () => {
    // yarn test (for Jest in Node)
    try {
      return await httpForTest.get('', {
        targetDt: formatDate(),
        multiMovieYn: selected.type,
        repNationCd: selected.country,
      });
    } catch (error) {
      showBoundary(error);
    }
  };
  const getMovieList = async () => {
    // yarn start && browser msw (dev, produvtion)
    // browser msw) msw는 요청 url을 가로채서 요청 핸들러에 정의해놓은 url과 동일하기만 하면 mocked Response를 응답
    try {
      return await CacheApi.getMovieData({
        targetDt: formatDate(),
        multiMovieYn: selected.type,
        repNationCd: selected.country,
      });
    } catch (error) {
      showBoundary(error);
    }
  };

  useEffect(() => {
    if (selected.country && selected.type && selected.year) {
      const fetchData =
        process.env.NODE_ENV === 'test' ? getTestMovieList : getMovieList;
      const promise = fetchData();
      setMovieList(promiseWrapper(promise));
    }
  }, [selected.country, selected.type, selected.year]);

  const resetMovieData = () => {
    setMovieList(null);
  };

  const movies = movieList && movieList?.boxOfficeResult?.weeklyBoxOfficeList;
  const selectedMovie = movies && movies[initNum(movies.length)].movieNm;

  return {
    selectedMovie,
    resetMovieData,
  };
}

export default useMovieData;
