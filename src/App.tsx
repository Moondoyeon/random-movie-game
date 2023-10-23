import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { URL } from 'constants/url';
import PageLayout from 'components/@layout/PageLayout';
import useCatch404Error from 'hooks/useCatch404Error';
import Loading from 'components/@common/Loading';

const MovieGamePage = lazy(() => import('pages/MovieGamePage'));

function App() {
  useCatch404Error();
  return (
    <PageLayout>
      <Suspense fallback={<Loading whiteBoard={false} />}>
        <Routes>
          <Route path={URL.HOME} element={<MovieGamePage />} />
        </Routes>
      </Suspense>
    </PageLayout>
  );
}
export default App;
