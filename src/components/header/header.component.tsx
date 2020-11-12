import React from "react";
import Image from "next/image";
import styles from "./header.module.scss";

interface IProps {
  title: string;
  logoSrc: string;
  logoSize: number;
}

const Header: React.FC<IProps> = (props) => {
  return (
    <header>
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
    </header>
  );
};

export { Header };
