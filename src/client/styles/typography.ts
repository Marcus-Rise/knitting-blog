import { css } from "styled-components";

const BadScript = css`
  font-family: "Bad Script", cursive;
  font-size: 1rem;
  line-height: initial;
  letter-spacing: 0.2em;
  font-weight: normal;
`;

const Montserrat = css`
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
`;

const Light = css`
  ${Montserrat};
  font-weight: 300;
`;

const Regular = css`
  ${Montserrat};
  font-weight: 400;
`;

const Bold = css`
  ${Montserrat};
  font-weight: 700;
`;

const Black = css`
  ${Montserrat};
  font-weight: 900;
`;

export { BadScript, Montserrat, Light, Regular, Bold, Black };
