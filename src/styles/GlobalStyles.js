import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.text};
    font-family: ${(props) => props.theme.fontFamily};
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.35s ease, color 0.35s ease;
    min-height: 100vh;
  }

  button {
    font-family: ${(props) => props.theme.fontFamily};
    font-weight: 500;
  }

  #root {
    min-height: 100vh;
  }
`;
