import ReactDOM from 'react-dom/client';
import { Global } from '@emotion/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense, lazy } from 'react';
import reportWebVitals from './reportWebVitals';
import App from './App';
import reset from 'style/reset';
import Loading from 'components/@common/Loading';
import ModalProvider from 'context/ModalContext';
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
          </ErrorBoundary>
        </Suspense>
      </ModalProvider>
    </Router>
  </>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
