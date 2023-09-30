import useMovieData from 'libs/hooks/useMovieData';
import BackDrop from '../@common/BackDrop';
import Button from '../@common/Button';
import Text from '../@common/Text';
import { randomResult } from 'pages/MovieGame/gamePage.style';

interface Props {
  selected: Record<string, string>;
  initEntrtyNSelection: () => void;
}
function GameResult({ selected, initEntrtyNSelection }: Props) {
  const country = selected.country === 'K' ? '국내' : '외국';
  const type = selected.type === 'N' ? '상업영화' : '다양성영화';

  const { selectedMovie, resetMovieData } = useMovieData({
    selected,
  });

  const initGame = () => {
    initEntrtyNSelection();
    resetMovieData();
  };

  if (selectedMovie)
    return (
      <BackDrop whiteBoard>
        <div css={randomResult.outer}>
          <Text typography="p">뽑기결과</Text>
          <Text typography="h5" css={randomResult.movieNm}>
            {selectedMovie}
          </Text>
          <div css={randomResult.bottom}>
            <Text typography="p">
              #{country} #{selected.year} #{type}
            </Text>
            <Button css={randomResult.initButton} onClick={initGame}>
              처음으로
            </Button>
          </div>
        </div>
      </BackDrop>
    );
}
export default GameResult;
