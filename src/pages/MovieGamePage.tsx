import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useSlot from 'hooks/useSlot';
import Button from 'components/@common/Button';
import Slot from 'components/@common/Slot';
import BackDrop from 'components/@common/BackDrop';
import MovieGameResult from 'components/MovieGameResult';
import { MOVIE_SLOTOPTION } from 'constants/slotOption';
import { slot, startButton } from './movieGamePage.style';
import Loading from 'components/@common/Loading';

const MovieErrorFallback = lazy(
  () => import('components/@helper/ErrorBoundary/MovieErrorFallback'),
);

function MovieGamePage() {
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
      {isFirstEntry && (
        <BackDrop whiteBoard={false}>
          <Button onClick={startSpinning} css={startButton}>
            S T A R T
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

      <Suspense fallback={<Loading whiteBoard height={150} />}>
        <ErrorBoundary
          FallbackComponent={MovieErrorFallback}
          onReset={initEntrtyNSelection}
        >
          <MovieGameResult
            selected={selected}
            initEntrtyNSelection={initEntrtyNSelection}
          />
        </ErrorBoundary>
      </Suspense>
    </section>
  );
}

export default MovieGamePage;
