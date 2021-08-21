import type { FC } from "react";
import React from "react";
import styles from "./mobile-menu-close-button.module.scss";
import classNames from "classnames";

interface IProps {
  onClick: () => void;
  className?: string;
}

const MobileMenuCloseButton: FC<IProps> = ({ className, onClick }) => (
  <button className={classNames(styles.root, className)} onClick={onClick}>
    X
  </button>
);

export { MobileMenuCloseButton };
