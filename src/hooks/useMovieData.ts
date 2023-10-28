import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { CacheApi } from 'api/Cache';
import { httpForTest } from 'api/http';
import { MovieList } from 'types/game';
import { initNum } from 'utils';
import { promiseWrapper } from 'utils/promiseWrapper';

function useMovieData({ selected }: { selected: Record<string, string> }) {
  const [movieList, setMovieList] = useState<MovieList | null>(null);
  const movies = movieList && movieList?.boxOfficeResult?.weeklyBoxOfficeList;
  const selectedMovie = movies && movies[initNum(movies.length)].movieNm;
  const { showBoundary } = useErrorBoundary();
  const formatDate = () => {
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const RANDOM_DAY = ['06', '13', '20', '27'];
    const day = RANDOM_DAY[Math.floor(Math.random() * 4)];
    return `${selected.year}${month}${day}`;
  };

  // env : 'production' or 'development'
  const getMovieList = async () => {
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
  // 용도: Jest, msw 브라우저 테스트 | env: 'test' or 'development'
  const getTestMovieList = async () => {
    try {
      return await httpForTest.get('/test');
    } catch (error) {
      showBoundary(error);
    }
  };

  const resetMovieData = () => {
    setMovieList(null);
  };

  useEffect(() => {
    if (selected.country && selected.type && selected.year) {
      const fetchData =
        process.env.NODE_ENV === 'test' ? getTestMovieList : getMovieList;
      const promise = fetchData();
      setMovieList(promiseWrapper(promise));
    }
  }, [selected.country, selected.type, selected.year]);

  return {
    selectedMovie,
    resetMovieData,
  };
}

export default useMovieData;
