import type { FC } from "react";
import React from "react";
import styles from "./mobile-menu-button.module.scss";
import humburgerIcon from "../../assets/humburger.svg";
import Image from "next/image";

interface IProps {
  onClick: () => void;
}

const MobileMenuButton: FC<IProps> = ({ onClick }) => (
  <button className={styles.root} onClick={onClick}>
    <Image src={humburgerIcon} alt={"menu"} />
  </button>
);

export { MobileMenuButton };
