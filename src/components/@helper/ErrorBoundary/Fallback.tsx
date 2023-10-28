import { css } from '@emotion/react';
import Button from 'components/@common/Button';
import { slot } from 'pages/movieGame.style';
import colors from 'style/colors';
import { responsive } from 'style/mixin';
import { FallbackProps } from 'types/errorBoundary';

interface Props {
  mainText?: string;
  subText: string;
  btnAriaLabel: string;
  onClick?: () => void;
}

function Fallback({
  error,
  resetErrorBoundary,
  mainText,
  subText,
  onClick,
  btnAriaLabel,
}: FallbackProps & Props) {
  const errorName = error.name === 'Error' ? '' : error.name;
  const handleButtonClick = () => {
    onClick && onClick();
    resetErrorBoundary!();
  };
  return (
    <div css={fallback.alignSlotCenter}>
      <div css={fallback.slotContainer}>
        <div css={slot.flexColumn}>
          <div css={fallback.spinningSquare}>
            <div css={fallback.textBox}>
              <div css={fallback.cryingEyes}>
                <p>ㅠ</p>
                <p>ㅠ</p>
              </div>
              <p className="mainText">
                앗..! {mainText} <br /> {errorName}
              </p>
              <p className="subText">{subText}</p>
            </div>
          </div>
          <Button
            css={slot.button}
            onClick={handleButtonClick}
            aria-label={btnAriaLabel}
          />
        </div>
      </div>
    </div>
  );
}

export default Fallback;

export const fallback = {
  alignSlotCenter: css`
    width: 100vw;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  slotContainer: css`
    display: flex;
    justify-content: center;
    width: 360px;
    height: 490px;
    background-color: ${colors.inverseGrey800};
    padding: 0 36px;
    border-radius: 10px;
    ${responsive('phone')} {
      width: 320px;
    }
  `,
  spinningSquare: css`
    width: 240px;
    height: 280px;
    background-color: ${colors.inverseGrey600};
    display: flex;
    flex-direction: column;
    align-items: center;
  `,

  textBox: css`
    font-family: Galmuri11;
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    .mainText {
      font-family: Galmuri11;
      font-weight: 800;
      font-size: 20px;
    }
    .subText {
      font-size: 14px;
    }
  `,
  cryingEyes: css`
    display: flex;
    width: 100%;
    justify-content: space-around;
    font-size: 44px;
    font-weight: 800;
  `,
};
