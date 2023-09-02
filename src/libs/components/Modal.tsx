import { css } from '@emotion/react';
import Txt from './Txt';
import colors from 'libs/style/colors';
import styled from '@emotion/styled';
import { initNum } from 'libs/utils';
import { MovieData } from 'libs/types/game';
import Spinner from './Spinner';
import { responsive } from 'libs/style/mixin';

interface Props {
  isFirstEntry: boolean;
  data: MovieData | null;
  isLoading: boolean;
  selected: {
    [key: string]: string;
  };
  startSpinning: () => void;
  initGame: () => void;
}
export default function Modal({
  isFirstEntry,
  data,
  isLoading,
  selected,
  startSpinning,
  initGame,
}: Props) {
  const { boxOfficeResult: { weeklyBoxOfficeList: movieList = [] } = {} } =
    data || {};
  const isFetched = movieList.length;
  const selectedMovie = movieList[initNum(movieList.length)];
  const country = selected.country === 'K' ? '국내' : '외국';
  const type = selected.type === 'N' ? '상업영화' : '다양성영화';

  return (
    <ModalContainer>
      {isFirstEntry && !selected.country && (
        <Txt
          typography="h1"
          color={colors.white}
          css={css`
            position: absolute;
            letter-spacing: 30px;
            cursor: pointer;
            ${responsive('phone')} {
              font-size: 40px;
            }
          `}
          onClick={startSpinning}
        >
          START
        </Txt>
      )}
      {isLoading && !isFirstEntry && (
        <GameResultContainer>
          <Spinner />
        </GameResultContainer>
      )}
      {isFetched && selected.country && (
        <GameResultContainer>
          <GameResultContent>
            <Txt typography="p" color={colors.black}>
              뽑기결과
            </Txt>

            <Txt
              typography="h5"
              color={colors.black}
              css={css`
                padding: 20px;
                text-align: center;
                width: 100%;
                word-wrap: break-word;
              `}
            >
              {selectedMovie.movieNm}
            </Txt>
            <div
              css={css`
                width: 90%;
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <Txt typography="p" color={colors.black}>
                #{country} #{selected.year} #{type}
              </Txt>
              <button
                css={css`
                  background-color: ${colors.grey200};
                  padding: 10px 16px;
                  border-radius: 6px;
                `}
                onClick={initGame}
              >
                처음으로
              </button>
            </div>
          </GameResultContent>
        </GameResultContainer>
      )}
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`;

const GameResultContainer = styled.div`
  position: absolute;
  background-color: ${colors.white};
  width: 500px;
  min-height: 200px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  ${responsive('phone')} {
    width: 400px;
    top: 20%;
  }
`;

const GameResultContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
