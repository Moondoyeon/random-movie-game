import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useSlot from 'hooks/useSlot';
import Button from 'components/@common/Button';
import Slot from 'components/@common/Slot';
import GameResult from 'components/movieGame/GameResult';
import Loading from 'components/@common/Loading';
import BackDrop from 'components/@common/BackDrop';
import MovieErrorFallback from 'components/@helper/ErrorBoundary/MovieErrorFallback';
import { MOVIE_SLOTOPTION } from 'constants/slotOption';
import { slot, startButton } from './movieGame.style';

function MovieGame() {
  const {
    selected,
    isFirstEntry,
    isSpinning,
    getSelectedOption,
    startSpinning,
    stopSpinning,
    initEntrtyNSelection,
  } = useSlot({ slotOption: MOVIE_SLOTOPTION });

  return (
    <>
      {isFirstEntry && (
        <BackDrop whiteBoard={false}>
          <Button
            onClick={startSpinning}
            css={startButton}
            // aria-label="게임시작"
          >
            START
          </Button>
        </BackDrop>
      )}

      <section css={slot.container}>
        {Object.entries(MOVIE_SLOTOPTION).map(([name, option]) => {
          return (
            <div key={name} css={slot.flexColumn}>
              <div css={slot.spinningSquare}>
                <Slot
                  name={name}
                  option={option}
                  isFirstEntry={isFirstEntry}
                  isSpinning={isSpinning}
                  getSelectedOption={getSelectedOption}
                  css={slot.spinningText}
                />
              </div>
              <Button
                aria-label={name}
                disabled={!isSpinning[name]}
                onClick={stopSpinning(name)}
                css={slot.button}
              ></Button>
            </div>
          );
        })}
      </section>

      <ErrorBoundary
        FallbackComponent={MovieErrorFallback}
        onReset={initEntrtyNSelection}
      >
        <Suspense fallback={<Loading whiteBoard />}>
          <GameResult
            selected={selected}
            initEntrtyNSelection={initEntrtyNSelection}
          />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default MovieGame;
