import ReactDOM from 'react-dom/client';
import { Global } from '@emotion/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, lazy } from 'react';
import App from './App';
import reset from 'style/reset';
import Loading from 'components/@common/Loading';
import ModalProvider from 'context/ModalContext';
import { Analytics } from '@vercel/analytics/react';

// import { worker } from 'mock/browser';
// if (process.env.NODE_ENV === 'development') {
//   worker.start({
//     onUnhandledRequest: 'bypass',
//   });
// }

const RootErrorFallback = lazy(
  () => import('components/@helper/ErrorBoundary/RootErrorFallback'),
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <>
    <Global styles={reset} />
    <Router>
      <ModalProvider>
        <Suspense fallback={<Loading whiteBoard={false} />}>
          <ErrorBoundary FallbackComponent={RootErrorFallback}>
            <App />
            <Analytics />
          </ErrorBoundary>
        </Suspense>
      </ModalProvider>
    </Router>
  </>,
);
