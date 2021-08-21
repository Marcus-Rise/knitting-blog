import type { FC } from "react";
import React from "react";
import styles from "./mobile-menu-button.module.scss";
import { hamburger } from "../../assets";
import Image from "next/image";

interface IProps {
  onClick: () => void;
}

const MobileMenuButton: FC<IProps> = ({ onClick }) => (
  <button className={styles.root} onClick={onClick}>
    <Image src={hamburger} alt={"menu"} />
  </button>
);

export { MobileMenuButton };
