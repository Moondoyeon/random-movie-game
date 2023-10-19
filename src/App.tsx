import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { URL } from 'constants/url';
import PageLayout from 'components/@layout/PageLayout';
import Loading from 'components/@common/Loading';
import useCatch404Error from 'hooks/useCatch404Error';

const MovieGame = lazy(() => import('pages/MovieGame'));

function App() {
  useCatch404Error();
  return (
    <PageLayout>
      <Suspense fallback={<Loading whiteBoard={false} />}>
        <Routes>
          <Route path={URL.HOME} element={<MovieGame />} />
        </Routes>
      </Suspense>
    </PageLayout>
  );
}
export default App;
