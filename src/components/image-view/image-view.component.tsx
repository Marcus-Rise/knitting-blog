import React, { useCallback, useState } from "react";
import { Modal } from "../modal";
import Image from "next/image";
import styles from "./image-view.module.scss";

const ImageView: React.FC<{ src: string; alt: string }> = (props) => {
  const [isShow, setIsShow] = useState(false);

  const close = useCallback(() => {
    setIsShow(false);
  }, []);
  const open = useCallback(() => {
    setIsShow(true);
  }, []);

  return (
    <>
      <div className={styles.preview} onClick={open}>
        {props.children}
      </div>
      {isShow && (
        <Modal onClose={close} splash>
          <div className={styles.root}>
            <div className={styles.header}>
              <button className={styles.close} onClick={close}>
                X
              </button>
            </div>
            <div className={styles.image}>
              <Image src={props.src} alt={props.alt} layout={"fill"} />
            </div>
            <p className={styles.alt}>{props.alt}</p>
          </div>
        </Modal>
      )}
    </>
  );
};

export { ImageView };
