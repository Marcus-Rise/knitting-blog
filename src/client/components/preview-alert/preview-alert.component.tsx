import type { FC } from "react";
import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { colors } from "../../styles";

const Root = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  padding: 0.05rem 2rem;
  background-color: ${colors.primary};
  color: white;
  font-size: 1.5rem;
  z-index: 2;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LinkStyled = styled.a`
  text-decoration: none;
  font-size: 2rem;
  color: white;

  &:hover {
    cursor: pointer;
  }
`;

const PreviewAlert: FC<{ title: string }> = ({ title }) => (
  <Root>
    <h5>Режим предпросмотра записи: {`"${title}"`}</h5>
    <Link href={"/api/exit-preview"}>
      <LinkStyled title={"Выйти"}>X</LinkStyled>
    </Link>
  </Root>
);

export { PreviewAlert };
