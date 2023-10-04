import { useNavigate } from 'react-router-dom';
import PageLayout from 'libs/components/@layout/PageLayout';
import { ERROR_MESSAGE } from 'libs/constants/errorMessage';
import Fallback from './Fallback';
import { copyEmail } from 'libs/utils';
import { URL } from 'libs/constants/url';
import { FallbackProps } from 'libs/types/errorBoundary';
import useModal from 'libs/hooks/useModal';

function RootErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const { openModal } = useModal();
  const navigate = useNavigate();
  const handleCopyButtonClick = () => {
    copyEmail('mmmdo21@gmail.com');
    openModal({
      type: 'alert',
      props: {
        title: '😀',
        message: '개발자 이메일이 복사되었어요',
        btnText: '닫기',
      },
    });
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
    openModal({
      type: 'alert',
      props: { title: '앗...😰', message: ERROR_MESSAGE[408], btnText: '닫기' },
    });

    resetErrorBoundary();
    return;
  }

  if (error.code === 'ERR_NETWORK') {
    openModal({
      type: 'alert',
      props: { title: '앗...😰', message: ERROR_MESSAGE[998], btnText: '닫기' },
    });
    resetErrorBoundary();
    return;
  }

  if (error.response?.status >= 500) {
    openModal({
      type: 'alert',
      props: { title: '앗...😰', message: ERROR_MESSAGE[500], btnText: '닫기' },
    });
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

export default RootErrorFallback;
