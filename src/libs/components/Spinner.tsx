import styled from '@emotion/styled';
import colors from 'libs/constants/colors';

const Spinner = styled.div`
  border: 10px solid ${colors.grey300};
  border-top: 10px solid ${colors.darkRed100};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
