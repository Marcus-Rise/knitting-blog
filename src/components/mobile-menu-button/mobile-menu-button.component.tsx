import React from "react";
import styles from "./mobile-menu-button.module.scss";
import humburgerIcon from "../../assets/humburger.svg";

interface IProps {
  onClick: () => void;
}

const MobileMenuButton: React.FC<IProps> = (props) => (
  <button className={styles.root} onClick={props.onClick}>
    <img src={humburgerIcon} alt={"menu"} />
  </button>
);

export { MobileMenuButton };
