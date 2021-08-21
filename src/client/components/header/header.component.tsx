import type { FC } from "react";
import React from "react";
import styles from "./header.module.scss";
import type { INavLink } from "../nav";
import { Nav } from "../nav";
import Link from "next/link";

interface IProps {
  title: string;
  // logoSrc: string;
  links: ReadonlyArray<INavLink>;
}

const Header: FC<IProps> = ({ links, title }) => (
  <header className={styles.root}>
    <Link href={"/"}>
      <a className={styles.link}>
        <div className={styles.logoContainer}>
          {/*<div className={styles.logo}>*/}
          {/*  <Image src={props.logoSrc} alt={props.title} height={"auto"} width={"auto"} layout={"responsive"} />*/}
          {/*</div>*/}
          <h1 className={styles.title}>{title}</h1>
        </div>
      </a>
    </Link>
    <Nav items={links} />
  </header>
);

export { Header };
