import React from "react";
import Image from "next/image";
import styles from "./header.module.scss";
import type { INavLink } from "../nav";
import { Nav } from "../nav";

interface IProps {
  title: string;
  logoSrc: string;
  logoSize: number;
  links: Array<INavLink>;
}

const Header: React.FC<IProps> = (props) => {
  return (
    <header className={styles.root}>
      <div className={styles.logoContainer}>
        <div className="container">
          <div className="row align-items-center flex-column">
            <div className="col-auto">
              <Image src={props.logoSrc} alt={props.title} height={props.logoSize} width={props.logoSize} />
            </div>
            <div className="col-auto">
              <h1 className={styles.title}>{props.title}</h1>
            </div>
          </div>
        </div>
      </div>
      <Nav items={props.links} />
    </header>
  );
};

export { Header };
