import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { URL } from 'libs/constants/url';
import PageLayout from 'libs/components/@layout/PageLayout';
import Loading from 'libs/components/@common/Loading';
import useCatch404Error from 'libs/hooks/useCatch404Error';

const MovieGame = lazy(() => import('pages/MovieGame/index'));

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
