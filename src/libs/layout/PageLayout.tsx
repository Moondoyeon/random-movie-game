import { ReactNode } from 'react';
import Header from './Header';
import { css } from '@emotion/react';

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
