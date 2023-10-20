import { css } from '@emotion/react';
import { ReactNode } from 'react';
import Header from './Header';

function PageLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <Header />
      <main
        css={css`
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {children}
      </main>
    </section>
  );
}

export default PageLayout;
