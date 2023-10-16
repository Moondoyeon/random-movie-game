import { css } from '@emotion/react';
import { ReactNode } from 'react';
import Header from './Header';

function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {children}
      </div>
    </>
  );
}

export default PageLayout;
