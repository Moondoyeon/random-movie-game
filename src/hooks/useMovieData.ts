import { useEffect, useState } from 'react';
import { useErrorBoundary } from 'react-error-boundary';
import { CacheMovieApi } from 'api/CacheMovieApi';
import { httpForTest } from 'api/http';
import { MovieData, SelectedSlotOption } from 'types/game';
import { formatDate, initNum } from 'utils';
import { promiseWrapper } from 'utils/promiseWrapper';

interface Props {
  selected: SelectedSlotOption;
}
function useMovieData({ selected }: Props) {
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const movieList = movieData?.boxOfficeResult?.weeklyBoxOfficeList;
  const selectedMovie =
    movieList && movieList![initNum(movieList.length)].movieNm;

  const { showBoundary } = useErrorBoundary();

  // env: prod or dev
  const getMovieList = async () => {
    try {
      return await CacheMovieApi.getMovieData({
        targetDt: formatDate(selected.year),
        multiMovieYn: selected.type,
        repNationCd: selected.country,
      });
    } catch (error) {
      showBoundary(error);
    }
  };
  // env: test or dev, 용도: Jest, msw 브라우저 테스트
  const getTestMovieList = async () => {
    try {
      return await httpForTest.get('/apiError');
    } catch (error) {
      showBoundary(error);
    }
  };

  const resetMovieData = () => {
    setMovieData(null);
  };

  useEffect(() => {
    if (selected.country && selected.type && selected.year) {
      const fetchData =
        process.env.NODE_ENV === 'test' ? getTestMovieList : getMovieList;
      const promise = fetchData();
      setMovieData(promiseWrapper(promise));
    }
  }, [selected.country, selected.type, selected.year]);

  return {
    selectedMovie,
    resetMovieData,
  };
}

export default useMovieData;
