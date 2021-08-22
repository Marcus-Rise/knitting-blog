import styled from "styled-components";
import { BadScript, colors } from "../../../styles";

const ImageStyled = styled.div`
  height: 320px;

  width: auto;
  overflow: hidden;

  & > div {
    &,
    & > img {
      position: relative !important;
    }
  }

  img {
    object-fit: cover;
    height: 320px !important;
    max-height: none !important;
    min-height: 0 !important;
    margin: 0 !important;
  }
`;

const Title = styled.h2`
  ${BadScript};
  font-size: 2rem;
  color: ${colors.primary};
  text-align: center;
  text-transform: uppercase;
  margin: 0;
  line-height: initial;
`;

const Meta = styled.p`
  text-align: center;
  color: ${colors.secondary};
  text-transform: uppercase;
`;

const Label = styled.p`
  ${BadScript};

  color: ${colors.primary};
  text-align: center;
  font-size: 1.5rem;
`;

const Footer = styled.p`
  color: ${colors.secondary};
  text-align: right;
  text-transform: capitalize;
`;

export { ImageStyled, Title, Meta, Label, Footer };
