import React, { useCallback } from "react";
import styles from "./modal.module.scss";
import { Overlay } from "../overlay";

interface IProps {
  onClose: () => void;
}

const Modal: React.FC<IProps> = (props) => {
  const onModalClick = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  return (
    <>
      <Overlay onClose={props.onClose}>
        <div className={styles.modal} onClick={onModalClick}>
          {props.children}
        </div>
      </Overlay>
    </>
  );
};

export { Modal };
