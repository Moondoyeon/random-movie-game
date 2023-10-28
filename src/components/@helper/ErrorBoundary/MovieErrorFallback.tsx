import { css } from '@emotion/react';
import BackDrop from 'components/@common/BackDrop';
import Button from 'components/@common/Button';
import { gameResult } from 'components/movieGame/GameResult.style';
import { responsive } from 'style/mixin';
import { FallbackProps } from 'types/errorBoundary';
import { isRootError } from 'utils/confirmErrorType';

function MovieErrorFallback({
  error,
  resetErrorBoundary,
  onReset,
}: FallbackProps) {
  if (isRootError(error)) {
    throw error;
  }
  const handleResetError = () => {
    resetErrorBoundary();
    onReset && onReset();
  };

  if (!error.response.data)
    return (
      <BackDrop whiteBoard>
        <div css={gameResult.box}>
          <p
            css={css`
              font-family: Galmuri11;
              font-weight: 700;
              margin: 10px 0 24px 0;
              text-align: center;
              font-size: 30px;
              ${responsive('phone')} {
                font-size: 22px;
              }
            `}
          >
            앗! 랜덤영화를 <br /> 뽑지 못헀어요 ㅠㅠ
          </p>
          <Button
            css={gameResult.initButton}
            onClick={handleResetError}
            aria-label="다시뽑기"
          >
            다시 뽑기
          </Button>
        </div>
      </BackDrop>
    );
}
export default MovieErrorFallback;
