import useMovieData from 'hooks/useMovieData';
import BackDrop from '../@common/BackDrop';
import Button from 'components/@common/Button';
import Text from 'components/@common/Text';
import { gameResult } from './GameResult.style';
import { parseSeletedOption } from 'utils';

interface Props {
  selected: Record<string, string>;
  initEntrtyNSelection: () => void;
}

function GameResult({ selected, initEntrtyNSelection }: Props) {
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
        <section css={gameResult.box} role="dialog" tabIndex={0}>
          <Text typography="h3" className="result">
            뽑기결과
          </Text>
          <Text typography="p" css={gameResult.movieNm}>
            {selectedMovie}
          </Text>
          <div css={gameResult.bottom}>
            <Text
              typography="p"
              aria-label={parseSeletedOption(selected, true)}
            >
              {parseSeletedOption(selected)}
            </Text>
            <Button css={gameResult.initButton} onClick={initGame}>
              다시뽑기
            </Button>
          </div>
        </section>
      </BackDrop>
    );
}
export default GameResult;
