import React, { useEffect } from "react";
import styles from "./overlay.module.scss";

interface IProps {
  onClose?: () => void;
}

const Overlay: React.FC<IProps> = (props) => {
  const onClick = (e: React.MouseEvent): void => {
    e.stopPropagation();

    if (props.onClose) {
      props.onClose();
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
      {props.children}
    </div>
  );
};

export { Overlay };
