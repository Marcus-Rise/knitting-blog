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

  body.modal {
    max-height: 100vh;
    overflow-y: hidden;
  }

  #__next {
    height: 100% !important;
  }

  main {
    min-height: 90vh;
  }
`;

export { GlobalStyles };
