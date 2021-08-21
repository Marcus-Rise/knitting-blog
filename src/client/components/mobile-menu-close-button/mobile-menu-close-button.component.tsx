import React from "react";
import styles from "./mobile-menu-close-button.module.scss";
import classNames from "classnames";

interface IProps {
  onClick: () => void;
  className?: string;
}

const MobileMenuCloseButton: React.FC<IProps> = (props) => {
  return (
    <button className={classNames(styles.root, props.className)} onClick={props.onClick}>
      X
    </button>
  );
};

export { MobileMenuCloseButton };
