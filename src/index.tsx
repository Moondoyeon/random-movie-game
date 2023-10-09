import ReactDOM from 'react-dom/client';
import { Global } from '@emotion/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import reset from 'libs/style/reset';
import reportWebVitals from './reportWebVitals';
import RootErrorFallback from 'libs/components/@helper/ErrorBoundary/RootErrorFallback';
import ModalProvider from 'libs/context/ModalContext';
import { Suspense } from 'react';
import Loading from 'libs/components/@common/Loading';
// import { worker } from 'mock/browser';

// if (process.env.NODE_ENV === 'development') {
//   worker.start({
//     onUnhandledRequest: 'bypass',
//   });
// }

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
reportWebVitals();
