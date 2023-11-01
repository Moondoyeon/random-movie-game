import BackDrop from './BackDrop';
import Spinner from './Spinner';
import styled from '@emotion/styled';

interface Props {
  whiteBoard: boolean;
  height?: number;
}
export default function Loading({ whiteBoard, height = 200 }: Props) {
  return (
    <BackDrop whiteBoard={whiteBoard}>
      <Wrapper height={height}>
        <Spinner />
      </Wrapper>
    </BackDrop>
  );
}

const Wrapper = styled.div<{ height: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.height}px;
`;
