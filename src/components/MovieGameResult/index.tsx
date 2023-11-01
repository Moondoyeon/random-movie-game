import useMovieData from 'hooks/useMovieData';
import BackDrop from '../@common/BackDrop';
import Button from 'components/@common/Button';
import { gameResult } from './movieGameResult.style';
import { parseSeletedMovieOption } from 'utils';
import { SelectedSlotOption } from 'types/game';
import { useMemo } from 'react';

interface Props {
  selected: SelectedSlotOption;
  initEntrtyNSelection: () => void;
}

function MovieGameResult({ selected, initEntrtyNSelection }: Props) {
  const { selectedMovie, resetMovieData } = useMovieData({
    selected,
  });
  const hashTag = useMemo(() => parseSeletedMovieOption(selected), [selected]);
  const hashTagAriaLabel = useMemo(
    () => parseSeletedMovieOption(selected, true),
    [selected],
  );

  const initGame = () => {
    initEntrtyNSelection();
    resetMovieData();
  };

  if (selectedMovie)
    return (
      <BackDrop whiteBoard>
        <section css={gameResult.box} role="dialog" tabIndex={0}>
          <h3 className="result">뽑기결과</h3>
          <p css={gameResult.movieNm}>{selectedMovie}</p>
          <div css={gameResult.bottom}>
            <p aria-label={hashTagAriaLabel}>{hashTag}</p>
            <Button css={gameResult.initButton} onClick={initGame}>
              다시뽑기
            </Button>
          </div>
        </section>
      </BackDrop>
    );
}
export default MovieGameResult;
