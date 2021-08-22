import type { FC } from "react";
import React from "react";
import type { INavLink } from "../nav";
import { Nav } from "../nav";
import Link from "next/link";
import NextImage from "next/image";
import { Container, Image, LinkStyled, Root, Title } from "./header.styles";
import Logo from "../../../../public/android-chrome-192x192.png";

interface IProps {
  title: string;
  links: ReadonlyArray<INavLink>;
}

const LOGO_SIZE = 35;

const Header: FC<IProps> = ({ links, title }) => (
  <Root>
    <Link href={"/"}>
      <LinkStyled>
        <Container>
          <Title>{title}</Title>
          <Image
            as={NextImage}
            src={Logo}
            alt={title}
            height={LOGO_SIZE}
            width={LOGO_SIZE}
            quality={15}
          />
        </Container>
      </LinkStyled>
    </Link>
    <Nav items={links} />
  </Root>
);

export { Header };
