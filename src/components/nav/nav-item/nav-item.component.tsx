import React from "react";
import Link from "next/link";
import type { INavLink } from "../nav-link.interface";
import styles from "./nav-item.module.scss";

type IProps = INavLink;

const NavItem: React.FC<IProps> = (props) => {
  return (
    <Link href={props.link}>
      <a className={styles.link}>{props.title}</a>
    </Link>
  );
};

export { NavItem };
