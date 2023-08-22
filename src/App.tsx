import { Global } from '@emotion/react';
import reset from 'libs/style/reset';

function App() {
  return (
    <>
      <Global styles={reset} />
    </>
  );
}

export default App;
