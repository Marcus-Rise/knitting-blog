import type { FC } from "react";
import React from "react";
import styled from "styled-components";
import { Montserrat } from "../../styles";

interface IProps {
  onClick: () => void;
}

const Root = styled.button`
  border: none;
  background: none;

  ${Montserrat};

  font-size: 1.5rem;
  padding: 1.1rem 1.2rem;

  cursor: pointer;
`;

const MobileMenuCloseButton: FC<IProps> = ({ onClick }) => <Root onClick={onClick}>X</Root>;

export { MobileMenuCloseButton };
