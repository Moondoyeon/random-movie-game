import { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';
import PageLayout from 'libs/components/@layout/PageLayout';
import { useAlertModalContext } from 'libs/context/AlertModalContext';
import { ERROR_MESSAGE } from 'libs/constants/errorMessage';
import Fallback from './Fallback';
import { copyEmail } from 'libs/utils';
import { URL } from 'libs/constants/url';

export default function RootErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const { showAlert } = useAlertModalContext();
  const navigate = useNavigate();
  const handleCopyButtonClick = () => {
    copyEmail('mmmdo21@gmail.com');
    showAlert('개발자 이메일이 복사되었어요');
  };

  if (error.response?.status === 404 || error.message == '404') {
    return (
      <PageLayout>
        <Fallback
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          mainText="존재하지 않는 페이지에요"
          subText="아래 버튼을 눌러 게임페이지로 돌아가세요"
          onClick={() => navigate(URL.HOME)}
        />
      </PageLayout>
    );
  }

  if (
    error.message === '408' ||
    error.response?.status === 408 ||
    error.code === 'ECONNABORTED'
  ) {
    showAlert(ERROR_MESSAGE[408]);
    resetErrorBoundary();
    return;
  }

  if (error.code === 'ERR_NETWORK') {
    showAlert(ERROR_MESSAGE[998]);
    resetErrorBoundary();
    return;
  }

  if (error.response?.status >= 500) {
    showAlert(ERROR_MESSAGE[500]);
    resetErrorBoundary();
    return;
  }

  return (
    <PageLayout>
      <Fallback
        error={error}
        resetErrorBoundary={resetErrorBoundary}
        mainText="에러가 발생했어요"
        subText="아래 버튼을 누르면 개발자 이메일이 복사돼요. 문제 상황을 알려주시면 소정의 선물을 드립니다."
        onClick={handleCopyButtonClick}
      />
    </PageLayout>
  );
}
