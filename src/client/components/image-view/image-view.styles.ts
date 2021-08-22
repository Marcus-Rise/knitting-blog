import styled from "styled-components";
import { BadScript, colors, media } from "../../styles";

const Root = styled.div`
  display: grid;
  grid-template-rows: auto 2fr;
  grid-row-gap: 1rem;

  padding-bottom: 1rem;
`;

const Preview = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Header = styled.div`
  width: 100%;
`;

const ImageStyled = styled.div`
  grid-area: image;
  display: grid;
  grid-template-rows: 2fr 1fr;
  grid-row-gap: 1rem;

  & > div {
    position: relative !important;
    overflow: auto !important;
    height: 80vh;

    ${media.sm} {
      height: 70vh;
    }
  }

  img {
    width: 100vw !important;
    height: 100vh !important;
    object-fit: contain !important;
  }
`;

const Label = styled.p`
  ${BadScript};

  color: ${colors.primary};
  text-align: center;
  font-size: 2rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
  display: inline-block;

  ${media.sm} {
    font-size: 1.5rem;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 3fr auto;
  grid-template-areas: "back image next";
`;

const Close = styled.button`
  display: block;
  margin-left: auto;
  text-decoration: none;
  font-size: 2rem;
  border: none;
  background: none;
  padding: 0;

  &:hover {
    cursor: pointer;
  }
`;

const NavigationButton = styled.button`
  background: none;
  border: none;
  font-size: 3rem;

  width: 10vw;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const NavigationButtonBack = styled(NavigationButton)`
  grid-area: back;
`;

const NavigationButtonNext = styled(NavigationButton)`
  grid-area: next;
`;

export {
  Root,
  Preview,
  ImageStyled,
  Label,
  Header,
  Container,
  Close,
  NavigationButtonBack,
  NavigationButtonNext,
};
