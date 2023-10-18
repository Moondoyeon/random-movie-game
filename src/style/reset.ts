import { css } from '@emotion/react';

const reset = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  @font-face {
    font-family: Galmuri11;
    font-style: normal;
    font-stretch: normal;
    font-weight: 400;
    font-display: swap;
    src:
      local('Galmuri11 Regular'),
      url('https://cdn.jsdelivr.net/npm/galmuri@latest/dist/Galmuri11.woff2')
        format('woff2'),
      url('https://cdn.jsdelivr.net/npm/galmuri@latest/dist/Galmuri11.woff')
        format('woff'),
      url('https://cdn.jsdelivr.net/npm/galmuri@latest/dist/Galmuri11.ttf')
        format('truetype');
  }

  @font-face {
    font-family: Galmuri11;
    font-style: normal;
    font-stretch: normal;
    font-weight: 700;
    font-display: swap;
    src:
      local('Galmuri11 Bold'),
      url('https://cdn.jsdelivr.net/npm/galmuri@latest/dist/Galmuri11-Bold.woff2')
        format('woff2'),
      url('https://cdn.jsdelivr.net/npm/galmuri@latest/dist/Galmuri11-Bold.woff')
        format('woff'),
      url('https://cdn.jsdelivr.net/npm/galmuri@latest/dist/Galmuri11-Bold.ttf')
        format('truetype');
  }
  body {
    font-family: 'Noto Sans KR', sans-serif;
    min-width: 320px; // 해당 너비 이하일때, 디자인이 깨지는 것 방지
  }
  button {
    background: none;
    border: none;
    color: inherit;
    outline: inherit;
    cursor: pointer;
  }
  li {
    list-style: none;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input:focus {
    outline: none;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: normal;
  }
`;

export default reset;
