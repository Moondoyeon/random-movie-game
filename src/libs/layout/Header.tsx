import { css } from '@emotion/react';
import Txt from 'libs/components/Txt';
import colors from 'libs/constants/colors';
function Header() {
  return (
    <div
      css={css`
        width: 100%;
        background: ${colors.background};
        padding: 20px;
      `}
    >
      <Txt typography="h5" color={colors.black}>
        random-movie-game
      </Txt>
    </div>
  );
}
export default Header;
