import { createGlobalStyle } from "styled-components";
import { Montserrat } from "./typography";

const GlobalStyles = createGlobalStyle`
  html,
  body {
    ${Montserrat};
  }

  body {
    margin: 0;
  }

  #__next {
    height: 100% !important;
  }

  main {
    min-height: 90vh;
  }
`;

export { GlobalStyles };
