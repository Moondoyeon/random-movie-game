import { css } from '@emotion/react';
import Text from 'components/@common/Text';
import colors from 'style/colors';
import { responsive } from 'style/mixin';
function Header() {
  return (
    <header
      css={css`
        width: 100%;
        background: ${colors.background};
        padding: 20px;
      `}
    >
      <Text
        typography="h1"
        css={css`
          font-family: Galmuri11;
          font-size: 30px;
          ${responsive('phone')} {
            font-size: 26px;
          }
        `}
      >
        랜덤영화뽑기
      </Text>
    </header>
  );
}
export default Header;
