import { MOVIE_SLOTOPTION } from 'libs/constants/slotOption';
import useSlot from 'libs/hooks/useSlot';
import Button from 'libs/components/@common/Button';
import Slot from 'libs/components/@common/Slot';
import { slot, startButton } from './movieGame.style';
import { ErrorBoundary } from 'react-error-boundary';
import GameResult from 'libs/components/movieGame/GameResult';
import MovieErrorFallback from 'libs/components/@helper/ErrorBoundary/MovieErrorFallback';
import { Suspense } from 'react';
import Loading from 'libs/components/@common/Loading';
import BackDrop from 'libs/components/@common/BackDrop';
import Test from './Test';

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
    <section>
      <Test />
      {isFirstEntry && (
        <BackDrop whiteBoard={false}>
          <Button onClick={startSpinning} css={startButton}>
            START
          </Button>
        </BackDrop>
      )}

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

      <div css={slot.container}>
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
      </div>
    </section>
  );
}

export default MovieGame;
