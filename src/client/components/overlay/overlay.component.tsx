import type { FC } from "react";
import React, { useEffect } from "react";
import styles from "./overlay.module.scss";

interface IProps {
  onClose?: () => void;
}

const Overlay: FC<IProps> = ({ children, onClose }) => {
  const onClick = (e: React.MouseEvent): void => {
    e.stopPropagation();

    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    body.classList.add(styles.body);

    return () => {
      body.classList.remove(styles.body);
    };
  }, []);

  return (
    <div className={styles.root} onClick={onClick}>
      {children}
    </div>
  );
};

export { Overlay };
