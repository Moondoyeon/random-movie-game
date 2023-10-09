import styled from '@emotion/styled';
import colors from 'libs/style/colors';
import { responsive } from 'libs/style/mixin';

interface Props {
  children: React.ReactNode;
  whiteBoard: boolean;
}
function BackDrop({ children, whiteBoard }: Props) {
  return (
    <Overlay>
      {whiteBoard ? (
        <WhiteBoard>{children}</WhiteBoard>
      ) : (
        <Content>{children}</Content>
      )}
    </Overlay>
  );
}
export default BackDrop;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  ${responsive('phone')} {
    padding: 0 0 0 32px;
  }
`;

const WhiteBoard = styled(Content)`
  position: absolute;
  background-color: ${colors.white};
  width: 500px;
  min-height: 200px;
  height: fit-content;
  border-radius: 6px;
  padding: 20px 20px;
  ${responsive('phone')} {
    width: 320px;
    top: 50%;
    padding: 5px 5px;
  }
`;
