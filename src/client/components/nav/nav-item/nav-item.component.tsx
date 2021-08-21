import type { FC } from "react";
import React from "react";
import Link from "next/link";
import type { INavLink } from "../nav-link.interface";
import styled from "styled-components";
import { Light, media } from "../../../styles";

type IProps = INavLink;

const Root = styled.a`
  ${Light};
  font-size: 1.25rem;
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;

  ${media.md} {
    display: inline-block;
  }
`;

const NavItem: FC<IProps> = ({ link, title }) => (
  <Link href={link}>
    <Root>{title}</Root>
  </Link>
);

export { NavItem };
