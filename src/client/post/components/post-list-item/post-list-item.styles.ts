import styled from "styled-components";
import { BadScript, Bold, colors } from "../../../styles";

const Title = styled.h2`
  ${Bold};
  font-size: 2rem;
  margin-bottom: 0;
`;

const Meta = styled.p`
  color: ${colors.secondary};
  font-size: 1rem;
  text-transform: capitalize;
`;

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

  &:hover {
    cursor: pointer;
  }

  img {
    object-fit: cover;
    height: 320px !important;
    max-height: none !important;
    min-height: 0 !important;
    margin: 0 !important;
  }
`;

const Label = styled.p`
  ${BadScript};

  color: ${colors.primary};
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 0;
`;

const Description = styled.p`
  line-height: 1.75rem;
`;

const Link = styled.div`
  a {
    text-decoration: none;
    color: ${colors.primary};
    border: 0.15rem dashed ${colors.accent};
    padding: 0.5rem 3rem;
    box-sizing: border-box;
    display: block;

    &:hover {
      border: none;
      color: white;
      background-color: ${colors.accent};
      padding: 0.65rem 3rem;
    }

    &:focus {
      box-shadow: inset 0 0 4px 2px rgba(0, 0, 0, 0.25);
    }
  }
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

export { Title, Meta, ImageStyled, Label, Description, Link, Center };
