import type { FC } from "react";
import React from "react";
import Link from "next/link";
import type { INavLink } from "../nav-link.interface";
import styles from "./nav-item.module.scss";

type IProps = INavLink;

const NavItem: FC<IProps> = ({ link, title }) => (
  <Link href={link}>
    <a className={styles.link}>{title}</a>
  </Link>
);

export { NavItem };
