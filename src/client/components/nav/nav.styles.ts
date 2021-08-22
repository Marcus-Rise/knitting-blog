import styled, { css } from "styled-components";
import { media } from "../../styles";

const Root = styled.nav`
  border-top: 1px dashed #000000;
  border-bottom: 1px dashed #000000;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  ${media.md} {
    border: none;
    padding: 0;
  }
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;

  ${media.md} {
    flex-direction: column;
    margin: 0;
  }
`;

const Li = styled.li`
  ${media.md} {
    padding-bottom: 1rem;
    width: 60%;
    text-align: center;

    &:not(:last-child) {
      border-bottom: 1px dashed black;
      margin-bottom: 1rem;
    }
  }
`;

const MobileToggle = styled.div`
  display: none;
  justify-content: flex-end;

  ${media.md} {
    display: flex;
  }
`;

const ItemsContainerShow = css`
  display: flex !important;
`;

const ItemsContainer = styled.div<{ showMobileMenu?: boolean }>`
  ${media.md} {
    display: none;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 901;
    background-color: white;
    width: 80vw;
  }

  ${(props) => props.showMobileMenu && ItemsContainerShow};
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export { Root, Ul, Li, MobileToggle, ItemsContainer, CloseButtonContainer };
