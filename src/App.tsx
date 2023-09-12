import { Global } from '@emotion/react';
import PageLayout from 'libs/layout/PageLayout';
import reset from 'libs/style/reset';
import GamePage from 'pages/MovieGamePage';

function App() {
  return (
    <>
      <Global styles={reset} />
      <PageLayout>
        <GamePage />
      </PageLayout>
    </>
  );
}

export default App;
