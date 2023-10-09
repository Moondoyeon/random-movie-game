import { useNavigate } from 'react-router-dom';
import PageLayout from 'libs/components/@layout/PageLayout';
import { ERROR_MESSAGE } from 'libs/constants/errorMessage';
import Fallback from './Fallback';
import { copyEmail } from 'libs/utils';
import { URL } from 'libs/constants/url';
import { FallbackProps } from 'libs/types/errorBoundary';
import useModal from 'libs/hooks/useModal';
import { useEffect } from 'react';
import {
  isNetworkError,
  isNotFoundError,
  isServerError,
  isTimeOutError,
} from 'libs/utils/confirmErrorType';

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { showModal } = useModal();
  const navigate = useNavigate();
  const handleCopyButtonClick = () => {
    copyEmail('mmmdo21@gmail.com');
    showModal({
      type: 'alert',
      props: {
        title: '😀',
        message: '개발자 이메일이 복사되었어요',
      },
    });
  };

  useEffect(() => {
    if (isTimeOutError(error)) {
      resetErrorBoundary();
      showModal({
        type: 'alert',
        props: {
          title: '앗...😰',
          message: ERROR_MESSAGE[408],
        },
      });
      return;
    }

    if (isNetworkError(error)) {
      resetErrorBoundary();
      showModal({
        type: 'alert',
        props: {
          title: '앗...😰',
          message: ERROR_MESSAGE[998],
        },
      });
      return;
    }

    if (isServerError(error)) {
      resetErrorBoundary();
      showModal({
        type: 'alert',
        props: {
          title: '앗...😰',
          message: ERROR_MESSAGE[500],
        },
      });
      return;
    }
  }, []);

  if (isNotFoundError(error)) {
    return (
      <PageLayout>
        <Fallback
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          mainText={ERROR_MESSAGE[404]}
          subText="아래 버튼을 눌러 게임페이지로 돌아가세요"
          onClick={() => navigate(URL.HOME)}
        />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Fallback
        error={error}
        resetErrorBoundary={resetErrorBoundary}
        mainText={ERROR_MESSAGE[999]}
        subText="아래 버튼을 누르면 개발자 이메일이 복사돼요. 문제 상황을 알려주시면 소정의 선물을 드립니다."
        onClick={handleCopyButtonClick}
      />
    </PageLayout>
  );
}

export default RootErrorFallback;
