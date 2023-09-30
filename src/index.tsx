import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { Global } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import reset from 'libs/style/reset';
import RootErrorFallback from 'libs/components/@helper/ErrorBoundary/RootErrorFallback';
import { AlertModalProvider } from 'libs/context/AlertModalContext';
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
  <BrowserRouter>
    <Global styles={reset} />
    <AlertModalProvider>
      <ErrorBoundary FallbackComponent={RootErrorFallback}>
        <App />
      </ErrorBoundary>
    </AlertModalProvider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
