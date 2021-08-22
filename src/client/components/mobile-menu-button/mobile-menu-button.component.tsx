import type { FC } from "react";
import React from "react";
import { hamburger } from "../../assets";
import Image from "next/image";
import styled from "styled-components";

interface IProps {
  onClick: () => void;
}

const Root = styled.button`
  border: none;
  background: none;
  cursor: pointer;
`;

const MobileMenuButton: FC<IProps> = ({ onClick }) => (
  <Root onClick={onClick}>
    <Image src={hamburger} alt={"menu"} />
  </Root>
);

export { MobileMenuButton };
