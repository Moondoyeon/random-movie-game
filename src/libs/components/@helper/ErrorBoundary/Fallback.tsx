import { css } from '@emotion/react';
import Button from 'libs/components/@common/Button';
import Text from 'libs/components/@common/Text';
import colors from 'libs/style/colors';
import { responsive } from 'libs/style/mixin';
import { FallbackProps } from 'libs/types/errorBoundary';
import { slot } from 'pages/movieGame.style';

interface Props {
  mainText?: string;
  subText: string;
  onClick?: () => void;
}

function Fallback({
  error,
  resetErrorBoundary,
  mainText,
  subText,
  onClick,
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
                <Text typography="h2">ㅠ</Text>
                <Text typography="h2">ㅠ</Text>
              </div>
              <Text typography="h5">
                앗..! <br /> {mainText} <br /> {errorName}
              </Text>
              <Text typography="p">{subText}</Text>
            </div>
          </div>
          <Button css={slot.button} onClick={handleButtonClick} />
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
    width: 95%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  `,
  cryingEyes: css`
    display: flex;
    width: 100%;
    justify-content: space-around;
  `,
};
