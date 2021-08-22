import styled from "styled-components";
import { BadScript, media } from "../../styles";

const Root = styled.header`
  display: flex;
  flex-direction: column;

  ${media.md} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 100;
    background: white;
    padding: 1rem;
    box-shadow: 0 5px 5px 0 rgba(50, 50, 50, 0.25);
  }

  ${media.sm} {
    padding: 0.5rem;
  }
`;

const LinkStyled = styled.a`
  color: inherit;
  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  padding-top: 1.75rem;
  padding-bottom: 1.75rem;
  box-sizing: border-box;

  background-image: url("/header_background_left.png"), url("/header_background_right.png");
  background-repeat: no-repeat, no-repeat;
  background-size: contain, contain;
  background-position: left top, right bottom;

  ${media.md} {
    background: none;
    display: flex;
    align-items: center;
    align-content: center;
    padding: 0;
  }
`;

const Image = styled.div`
  ${media.lg} {
    display: none !important;
  }
`;

const Title = styled.h1`
  ${BadScript};
  font-size: 2.5rem;
  text-align: center;

  ${media.md} {
    margin: 0 0.75rem 0 0;
    font-size: 1.5rem;
  }
`;

export { Root, Title, LinkStyled, Container, Image };
