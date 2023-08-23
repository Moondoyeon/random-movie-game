import { ReactNode } from 'react';
import Header from './Header';

function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div>{children}</div>
    </>
  );
}

export default PageLayout;
