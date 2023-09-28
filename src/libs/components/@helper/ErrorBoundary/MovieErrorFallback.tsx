import BackDrop from 'libs/components/@common/BackDrop';
import Button from 'libs/components/@common/Button';
import Text from 'libs/components/@common/Text';
import { isRootError } from 'libs/utils/confirmErrorType';
import { randomResult } from 'pages/MovieGame/gamePage.style';
import { FallbackProps } from 'react-error-boundary';

export default function MovieErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  if (isRootError(error.response?.status, error.code, error.message)) {
    throw error;
  }

  if (!error.response.data) {
    return (
      <BackDrop whiteBoard>
        <div css={randomResult.outer}>
          <Text typography="p">뽑기결과</Text>
          <Text typography="h5" css={randomResult.movieNm}>
            앗! 랜덤영화를 뽑지 못헀어요 ㅠㅠ
          </Text>
          <div css={randomResult.bottom}>
            <Button css={randomResult.initButton} onClick={resetErrorBoundary}>
              다시 뽑기
            </Button>
          </div>
        </div>
      </BackDrop>
    );
  } else throw error;
}
