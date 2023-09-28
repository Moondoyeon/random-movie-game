import { css } from '@emotion/react';
import colors from 'libs/style/colors';
import { responsive } from 'libs/style/mixin';

interface Props {
  children: React.ReactNode;
  whiteBoard: boolean;
}
export default function BackDrop({ children, whiteBoard }: Props) {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
      `}
    >
      {whiteBoard ? (
        <div
          css={css`
            position: absolute;
            background-color: ${colors.white};
            width: 500px;
            min-height: 200px;
            border-radius: 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 16px 0;
            ${responsive('phone')} {
              width: 400px;
              top: 20%;
            }
          `}
        >
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
