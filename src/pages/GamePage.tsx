import { css } from '@emotion/react';
import colors from 'libs/style/colors';
import { responsive } from 'libs/style/mixin';
import {
  SLOT_MOVIE_COUNTRY,
  SLOT_MOVIE_TYPE,
  SLOT_MOVIE_YEAR,
} from 'libs/constants/slotOptions';
import useSlot from 'libs/hooks/useSlot';
import useMovieData from 'libs/hooks/useMovieData';

import Button from 'libs/components/Button';
import Spinner from 'libs/components/Spinner';
import Text from 'libs/components/Text';
import Modal from 'libs/components/Modal';
import Slot from 'libs/components/Slot';

// interface MovieSlot {
//   country: string;
//   year: string;
//   type: string;
// }
export default function GamePage() {
  const COUNTRY = 'country';
  const YEAR = 'year';
  const TYPE = 'type';

  const option = { country: '', type: '', year: '' };
  // const [option, setOption] = useState({
  //   country: '',
  //   year: '',
  //   type: '',
  // });

  const constants = [
    [COUNTRY, SLOT_MOVIE_COUNTRY],
    [YEAR, SLOT_MOVIE_TYPE],
    [YEAR, SLOT_MOVIE_YEAR],
  ];
  const {
    isFirstEntry,
    selected,
    isSpinning,
    getSelectedOption,
    startSpinning,
    stopSpinning,
    initEntryAndSelection,
  } = useSlot({ option, constants });

  const {
    selectedMovie,
    type,
    country,
    isLoading,
    isError,
    resetDataAndLoading,
  } = useMovieData({
    selected,
  });

  const initGame = () => {
    initEntryAndSelection();
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

      {isLoading && (
        <Modal whiteBoard>
          <Spinner />
        </Modal>
      )}

      {selectedMovie ? (
        <Modal whiteBoard>
          <div css={randomResult.outer}>
            <Text typography="p">뽑기결과</Text>
            <Text typography="h5" css={randomResult.movieNm}>
              {!isError
                ? selectedMovie?.movieNm
                : '랜덤영화를 뽑지 못헀어요 ㅠㅠ'}
            </Text>
            <div css={randomResult.bottom}>
              <Text typography="p">
                #{country} #{selected.year} #{type}
              </Text>
              <Button css={randomResult.initButton} onClick={initGame}>
                {!isError ? '처음으로' : '다시 시도하기'}
              </Button>
            </div>
          </div>
        </Modal>
      ) : null}

      <div css={slot.container}>
        <div css={slot.flexColumn}>
          <div css={slot.spinningSquare}>
            <Slot
              name={COUNTRY}
              option={SLOT_MOVIE_COUNTRY}
              isFirstEntry={isFirstEntry}
              isSpinning={isSpinning}
              getSelectedOption={getSelectedOption}
              css={slot.spinningText}
            />
          </div>
          <Button
            aria-label={COUNTRY}
            disabled={!isSpinning[COUNTRY]}
            onClick={stopSpinning(COUNTRY)}
            css={slot.button}
          ></Button>
        </div>
        <div css={slot.flexColumn}>
          <div css={slot.spinningSquare}>
            <Slot
              name={YEAR}
              option={SLOT_MOVIE_YEAR}
              isFirstEntry={isFirstEntry}
              isSpinning={isSpinning}
              getSelectedOption={getSelectedOption}
              css={slot.spinningText}
            />
          </div>
          <Button
            aria-label={YEAR}
            disabled={!isSpinning[YEAR]}
            onClick={stopSpinning(YEAR)}
            css={slot.button}
          ></Button>
        </div>
        <div css={slot.flexColumn}>
          <div css={slot.spinningSquare}>
            <Slot
              name={TYPE}
              option={SLOT_MOVIE_TYPE}
              isFirstEntry={isFirstEntry}
              isSpinning={isSpinning}
              getSelectedOption={getSelectedOption}
              css={slot.spinningText}
            />
          </div>
          <Button
            aria-label={TYPE}
            disabled={!isSpinning[TYPE]}
            onClick={stopSpinning(TYPE)}
            css={slot.button}
          ></Button>
        </div>
      </div>
    </section>
  );
}

const startButton = css`
  font-family: Galmuri11;
  position: absolute;
  letter-spacing: 30px;
  cursor: pointer;
  color: ${colors.white};
  font-size: 65px;
  font-weight: 700;
  ${responsive('phone')} {
    font-size: 40px;
    top: 26%;
  }
`;

const randomResult = {
  outer: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  movieNm: css`
    padding: 20px;
    text-align: center;
    width: 100%;
    word-wrap: break-word;
  `,
  bottom: css`
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  initButton: css`
    background-color: ${colors.grey200};
    padding: 10px 16px;
    border-radius: 6px;
  `,
};

const slot = {
  container: css`
    display: flex;
    justify-content: space-around;
    width: 960px;
    height: 520px;
    background-color: ${colors.inverseGrey800};
    margin: 40px 0;
    padding: 0 36px;
    border-radius: 10px;
    ${responsive('phone')} {
      width: 400px;
      padding: 0 30px;
    }
    ${responsive('tablet')} {
      width: 700px;
    }
  `,
  flexColumn: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  spinningSquare: css`
    width: 220px;
    height: 280px;
    background-color: ${colors.inverseGrey600};
    display: flex;
    flex-direction: column;
    align-items: center;
    ${responsive('phone')} {
      width: 100px;
    }
    ${responsive('tablet')} {
      width: 180px;
    }
  `,
  spinningText: css`
    padding: 36px 0;
    font-size: 18px;
    color: ${colors.green200};
    ${responsive('phone')} {
      font-size: 16px;
    }
  `,
  button: css`
    width: 50px;
    height: 50px;
    margin-top: 30px;
    border-radius: 100%;
    background-color: ${colors.darkRed100};
    box-shadow: ${colors.darkRed200} 3px 3px 0 0;
    ${responsive('phone')} {
      width: 40px;
      height: 40px;
    }
    &:active {
      box-shadow: ${colors.darkRed200} 2px 2px 0 0;
      transform: translate(2px, 2px);
    }
  `,
};
