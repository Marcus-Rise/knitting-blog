import React, { useCallback, useEffect } from "react";
import styles from "./modal.module.scss";
import { Overlay } from "../overlay";
import classNames from "classnames";

interface IProps {
  onClose: () => void;
  splash?: boolean;
}

const Modal: React.FC<IProps> = (props) => {
  const onModalClick = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  useEffect(() => {
    const close = (e: KeyboardEvent): void => {
      if (e.code === "Escape") {
        props.onClose();
      }
    };

    document.addEventListener("keydown", close);

    return () => document.removeEventListener("keydown", close);
  });

  return (
    <>
      <Overlay onClose={props.onClose}>
        <div className={classNames(styles.modal, { [styles.splash]: props.splash })} onClick={onModalClick}>
          {props.children}
        </div>
      </Overlay>
    </>
  );
};

export { Modal };
