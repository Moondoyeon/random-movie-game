import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { URL } from 'constants/url';
import PageLayout from 'components/@layout/PageLayout';
import useCatch404Error from 'hooks/useCatch404Error';

const MovieGame = lazy(() => import('pages/MovieGame'));

function App() {
  useCatch404Error();
  return (
    <PageLayout>
      <Routes>
        <Route path={URL.HOME} element={<MovieGame />} />
      </Routes>
    </PageLayout>
  );
}
export default App;
