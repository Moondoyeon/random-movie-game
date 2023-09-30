/* eslint-disable @typescript-eslint/no-explicit-any */
import BackDrop from 'libs/components/@common/BackDrop';
import Button from 'libs/components/@common/Button';
import Text from 'libs/components/@common/Text';
import { isRootError } from 'libs/utils/confirmErrorType';
import { randomResult } from 'pages/MovieGame/gamePage.style';

export type FallbackProps = {
  error: any;
  resetErrorBoundary: (...args: any[]) => void;
  onReset?: () => void;
};

export default function MovieErrorFallback({
  error,
  resetErrorBoundary,
  onReset,
}: FallbackProps) {
  if (isRootError(error.response?.status, error.code, error.message)) {
    throw error;
  }
  const handleResetError = () => {
    resetErrorBoundary();
    onReset && onReset();
  };
  if (!error.response.data)
    return (
      <BackDrop whiteBoard>
        <div css={randomResult.outer}>
          <Text typography="p">뽑기결과</Text>
          <Text typography="h5" css={randomResult.movieNm}>
            앗! 랜덤영화를 뽑지 못헀어요 ㅠㅠ
          </Text>
          <div css={randomResult.bottom}>
            <Button css={randomResult.initButton} onClick={handleResetError}>
              다시 뽑기
            </Button>
          </div>
        </div>
      </BackDrop>
    );
  else throw error;
}
