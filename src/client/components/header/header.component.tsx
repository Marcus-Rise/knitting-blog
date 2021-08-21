import type { FC } from "react";
import React from "react";
import type { INavLink } from "../nav";
import { Nav } from "../nav";
import Link from "next/link";
import { Container, LinkStyled, Root, Title } from "./header.styles";

interface IProps {
  title: string;
  links: ReadonlyArray<INavLink>;
}

const Header: FC<IProps> = ({ links, title }) => (
  <Root>
    <Link href={"/"}>
      <LinkStyled>
        <Container>
          <Title>{title}</Title>
        </Container>
      </LinkStyled>
    </Link>
    <Nav items={links} />
  </Root>
);

export { Header };
