import { css } from '@emotion/react';
import Text from 'libs/components/@common/Text';
import colors from 'libs/style/colors';
function Header() {
  return (
    <div
      css={css`
        width: 100%;
        background: ${colors.background};
        padding: 20px;
      `}
    >
      <Text typography="h5">random-movie-game</Text>
    </div>
  );
}
export default Header;
