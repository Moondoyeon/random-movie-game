import { MOVIE_SLOTOPTION } from 'libs/constants/slotOption';
import useSlot from 'libs/hooks/useSlot';
import useMovieData from 'libs/hooks/useMovieData';
import Button from 'libs/components/@common/Button';
import Text from 'libs/components/@common/Text';
import Modal from 'libs/components/@common/BackDrop';
import Slot from 'libs/components/@common/Slot';
import { randomResult, slot, startButton } from './gamePage.style';

export default function MovieGamePage() {
  const {
    selected,
    isFirstEntry,
    isSpinning,
    getSelectedOption,
    startSpinning,
    stopSpinning,
    initEntryStateAndSelection,
  } = useSlot({ slotOption: MOVIE_SLOTOPTION });

  const { selectedMovie, type, country, resetDataAndLoading } = useMovieData({
    selected,
  });

  const initGame = () => {
    initEntryStateAndSelection();
    resetDataAndLoading();
  };

  return (
    <section>
      {isFirstEntry && (
        <Modal whiteBoard={false}>
          <Button onClick={startSpinning} css={startButton}>
            START
          </Button>
        </Modal>
      )}

      {selectedMovie ? (
        <Modal whiteBoard>
          <div css={randomResult.outer}>
            <Text typography="p">뽑기결과</Text>
            <Text typography="h5" css={randomResult.movieNm}>
              {selectedMovie?.movieNm}
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
        </Modal>
      ) : null}

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
