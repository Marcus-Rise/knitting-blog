import type { FC } from "react";
import React, { useCallback, useEffect } from "react";
import styles from "./modal.module.scss";
import { Overlay } from "../overlay";
import classNames from "classnames";

interface IProps {
  onClose: () => void;
  splash?: boolean;
}

const Modal: FC<IProps> = ({ children, onClose, splash }) => {
  const onModalClick = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  useEffect(() => {
    const close = (e: KeyboardEvent): void => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    const event = "keydown";
    document.addEventListener(event, close);

    return () => document.removeEventListener(event, close);
  });

  return (
    <>
      <Overlay onClose={onClose}>
        <div
          className={classNames(styles.modal, { [styles.splash]: splash })}
          onClick={onModalClick}
        >
          {children}
        </div>
      </Overlay>
    </>
  );
};

export { Modal };
