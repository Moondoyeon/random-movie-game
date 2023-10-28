import { css } from '@emotion/react';
import { responsive } from 'style/mixin';
import colors from 'style/colors';
function Header() {
  return (
    <header css={headerStyle.header}>
      <h1 css={headerStyle.AppName}>랜덤영화뽑기</h1>
    </header>
  );
}
export default Header;

const headerStyle = {
  header: css`
    width: 100%;
    background: ${colors.background};
    padding: 20px;
  `,
  AppName: css`
    font-family: Galmuri11;
    font-weight: 700;
    font-size: 30px;
    ${responsive('phone')} {
      font-size: 26px;
    }
  `,
};
