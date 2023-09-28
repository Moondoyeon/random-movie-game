import styled from '@emotion/styled';
import Button from 'libs/components/@common/Button';
import Text from 'libs/components/@common/Text';
import colors from 'libs/style/colors';

import { slot } from 'pages/MovieGame/gamePage.style';
import { FallbackProps } from 'react-error-boundary';

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
  const handleButtonClick = () => {
    onClick && onClick();
    resetErrorBoundary!();
  };
  return (
    <AlignSlotCenter>
      <SlotContainer>
        <div css={slot.flexColumn}>
          <div css={slot.spinningSquare}>
            <TextBox>
              <CryingEyes>
                <Text typography="h2">ㅠ</Text>
                <Text typography="h2">ㅠ</Text>
              </CryingEyes>
              <Text typography="h5">
                앗..!
                <br />
                {mainText}
                <br />
                {error.name === 'Error' ? '' : error.name}
              </Text>
              <Text typography="p">{subText}</Text>
            </TextBox>
          </div>
          <Button css={slot.button} onClick={handleButtonClick} />
        </div>
      </SlotContainer>
    </AlignSlotCenter>
  );
}

export default Fallback;
const AlignSlotCenter = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SlotContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 360px;
  height: 490px;
  background-color: ${colors.inverseGrey800};
  padding: 0 36px;
  border-radius: 10px;
`;

const TextBox = styled.div`
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
`;

const CryingEyes = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;
