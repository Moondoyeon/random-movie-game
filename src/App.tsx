import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import PageLayout from 'libs/components/@layout/PageLayout';
import MovieErrorFallback from 'libs/components/@helper/ErrorBoundary/MovieErrorFallback';
import useCatch404Error from 'libs/hooks/useCatch404Error';
import { URL } from 'libs/constants/url';
import { Suspense, lazy } from 'react';
import Loading from 'libs/components/@common/Loading';

const MovieGame = lazy(() => import('pages/MovieGame/index'));

function App() {
  useCatch404Error();

  return (
    <PageLayout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route
            path={URL.HOME}
            element={
              <ErrorBoundary FallbackComponent={MovieErrorFallback}>
                <MovieGame />
              </ErrorBoundary>
            }
          />
        </Routes>
      </Suspense>
    </PageLayout>
  );
}

export default App;
