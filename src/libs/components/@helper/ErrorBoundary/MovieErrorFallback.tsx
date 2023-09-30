import BackDrop from 'libs/components/@common/BackDrop';
import Button from 'libs/components/@common/Button';
import Text from 'libs/components/@common/Text';
import { gameResult } from 'libs/components/movieGame/GameResult.style';
import { FallbackProps } from 'libs/types/errorBoundary';
import { isRootError } from 'libs/utils/confirmErrorType';

function MovieErrorFallback({
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
        <div css={gameResult.box}>
          <Text typography="p">뽑기결과</Text>
          <Text typography="h5" css={gameResult.movieNm}>
            앗! 랜덤영화를 뽑지 못헀어요 ㅠㅠ
          </Text>
          <div css={gameResult.bottom}>
            <Button css={gameResult.initButton} onClick={handleResetError}>
              다시 뽑기
            </Button>
          </div>
        </div>
      </BackDrop>
    );
  else throw error;
}
export default MovieErrorFallback;
