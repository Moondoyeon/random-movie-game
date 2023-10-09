import useMovieData from 'libs/hooks/useMovieData';
import BackDrop from '../@common/BackDrop';
import Button from '../@common/Button';
import Text from '../@common/Text';
import { gameResult } from './GameResult.style';

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
        <div css={gameResult.box}>
          <Text typography="p">뽑기결과</Text>
          <Text typography="h5" css={gameResult.movieNm}>
            {selectedMovie}
          </Text>
          <div css={gameResult.bottom}>
            <Text typography="p">
              #{country} #{selected.year} #{type}
            </Text>
            <Button css={gameResult.initButton} onClick={initGame}>
              처음으로
            </Button>
          </div>
        </div>
      </BackDrop>
    );
}
export default GameResult;
