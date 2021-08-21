import styled from "styled-components";
import { media } from "../../styles";

const Container = styled.div`
  max-width: 75vw;
  margin: 0 auto;

  ${media.sm} {
    max-width: 90vw;
  }
`;

export { Container };
