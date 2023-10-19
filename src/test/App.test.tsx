import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { server } from 'mock/server';
import {
  get404Error,
  get500Error,
  getMockMovieData,
  getNetworkError,
} from 'mock/handlers';

import App from '../App';
import Loading from 'components/@common/Loading';
import ModalProvider from 'context/ModalContext';
import RootErrorFallback from 'components/@helper/ErrorBoundary/RootErrorFallback';

describe('App test', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const user = userEvent.setup();

  test('"START" 버튼을 누르면 "슬롯" 버튼이 활성화 된다', async () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/START/)).toBeInTheDocument();
    });
    user.click(await screen.findByText(/START/));

    await waitFor(() => {
      expect(screen.queryByText(/START/)).not.toBeInTheDocument();
    });

    const slotButton1 = screen.queryByRole('button', {
      name: 'country',
    });
    const slotButton2 = screen.queryByRole('button', {
      name: 'type',
    });
    const slotButton3 = screen.queryByRole('button', {
      name: 'year',
    });

    expect(slotButton1).toBeEnabled();
    expect(slotButton2).toBeEnabled();
    expect(slotButton3).toBeEnabled();
  });
  test('"슬롯" 버튼을 전부 누르면 선택된 값을 서버로 전송하고, 응답결과를 받는다.', async () => {
    server.use(rest.get(`${process.env.REACT_APP_BASE_URL}`, getMockMovieData));
    render(
      <Router>
        <App />
      </Router>,
    );
    await waitFor(() => {
      expect(screen.queryByText(/START/)).toBeInTheDocument();
    });
    user.click(await screen.findByText(/START/));
    user.click(await screen.findByRole('button', { name: 'country' }));
    user.click(await screen.findByRole('button', { name: 'type' }));
    user.click(await screen.findByRole('button', { name: 'year' }));

    await waitFor(() => {
      expect(screen.queryByText(/비와 당신의 이야기/)).toBeInTheDocument();
    });
  });
  test('“처음으로” 버튼을 누르면 “START” 버튼이 나타난다.', async () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.queryByText(/START/)).toBeInTheDocument();
    });
    user.click(screen.getByText(/START/));
    user.click(await screen.findByRole('button', { name: 'country' }));
    user.click(await screen.findByRole('button', { name: 'type' }));
    user.click(await screen.findByRole('button', { name: 'year' }));

    await waitFor(
      () => {
        expect(screen.queryByText(/뽑기결과/)).toBeInTheDocument();
      },
      { timeout: 10000 },
    );

    user.click(await screen.findByText(/처음으로/));

    await waitFor(() => {
      expect(screen.queryByText(/START/)).toBeInTheDocument();
    });
  });
  test('404 에러가 발생하면 404 페이지가 나타난다. 버튼을 눌러 진입페이지으로 이동한다', async () => {
    render(
      <Router>
        <ModalProvider>
          <Suspense fallback={<Loading whiteBoard={false} />}>
            <ErrorBoundary FallbackComponent={RootErrorFallback}>
              <App />
            </ErrorBoundary>
          </Suspense>
        </ModalProvider>
      </Router>,
    );
    server.use(rest.get(`${process.env.REACT_APP_BASE_URL}`, get404Error));

    user.click(await screen.findByText(/START/));
    user.click(await screen.findByRole('button', { name: 'country' }));
    user.click(await screen.findByRole('button', { name: 'type' }));
    user.click(await screen.findByRole('button', { name: 'year' }));

    await waitFor(() => {
      expect(
        screen.queryByText(/존재하지 않는 페이지에요/),
      ).toBeInTheDocument();
    });

    user.click(await screen.findByRole('button'));
    waitFor(() => {
      expect(screen.findByText(/START/)).toBeInTheDocument();
    });
  });

  test('500 에러가 발생하면 에러 모달이 나타난다. 닫기버튼을 누르면 진입페이지로 이동한다', async () => {
    // CreatePortal 사용시 Jest가 모달을 인식못함. 분기 후 테스트 중
    render(
      <Router>
        <ModalProvider>
          <Suspense fallback={<Loading whiteBoard={false} />}>
            <ErrorBoundary FallbackComponent={RootErrorFallback}>
              <App />
            </ErrorBoundary>
          </Suspense>
        </ModalProvider>
      </Router>,
    );

    server.use(rest.get(`${process.env.REACT_APP_BASE_URL}`, get500Error));

    user.click(await screen.findByText(/START/));

    user.click(await screen.findByRole('button', { name: 'country' }));
    user.click(await screen.findByRole('button', { name: 'type' }));
    user.click(await screen.findByRole('button', { name: 'year' }));

    await waitFor(() => {
      expect(
        screen.queryByText(
          /영화데이터 서버에 문제가 생겼어요! 게임을 다시 해보시고, 그래도 안된다면 잠시후 시도해주세요/,
        ),
      ).toBeInTheDocument();
    });

    user.click(await screen.findByText('닫기'));
    waitFor(() => {
      expect(screen.findByText(/START/)).toBeInTheDocument();
    });
  });

  test.skip('네트워크 에러가 발생하면 에러 모달이 나타난다.', async () => {
    // CreatePortal 사용시 Jest가 모달을 인식못함. 분기 후 테스트 중
    render(
      <Router>
        <ModalProvider>
          <Suspense fallback={<Loading whiteBoard={false} />}>
            <ErrorBoundary FallbackComponent={RootErrorFallback}>
              <App />
            </ErrorBoundary>
          </Suspense>
        </ModalProvider>
      </Router>,
    );

    server.use(rest.get(`${process.env.REACT_APP_BASE_URL}`, getNetworkError));

    user.click(await screen.findByText(/START/));

    user.click(await screen.findByRole('button', { name: 'country' }));
    user.click(await screen.findByRole('button', { name: 'type' }));
    user.click(await screen.findByRole('button', { name: 'year' }));

    await waitFor(() => {
      expect(
        screen.queryByText(
          /네트워크 연결이 약한것같아요. 와이파이 연결을 확인해주시고, 재시도 해주세요!/,
        ),
      ).toBeInTheDocument();
    });
  });
});
