import { css } from '@emotion/react';
import Text from 'components/@common/Text';
import colors from 'style/colors';
function Header() {
  return (
    <div
      css={css`
        width: 100%;
        background: ${colors.background};
        padding: 20px;
        font-family: Galmuri11;
      `}
    >
      <Text typography="h5">Random Movie Game</Text>
    </div>
  );
}
export default Header;
