import React, { useCallback, useEffect, useState } from "react";
import { Modal } from "../modal";
import NextImage from "next/image";
import styles from "./image-view.module.scss";

interface ImageItem {
  src: string;
  alt: string;
}

interface IProps extends ImageItem {
  album?: ImageItem[];
}

const ImageView: React.FC<IProps> = (props) => {
  const [isShow, setIsShow] = useState(false);
  const [currentImage, setCurrentImage] = useState<ImageItem>(() => {
    const [item] = props.album ?? [];

    return item ?? { ...props };
  });
  const close = useCallback(() => {
    setIsShow(false);
  }, []);
  const open = useCallback(() => {
    setIsShow(true);
  }, []);
  const slideLeft = useCallback(() => {
    if (props.album) {
      const currentIndex = props.album.findIndex((i) => i.src === currentImage.src);

      if (currentIndex > 0) {
        setCurrentImage(props.album[currentIndex - 1]);
      }
    }
  }, [props.album, currentImage.src]);
  const slideRight = useCallback(() => {
    if (props.album) {
      const currentIndex = props.album.findIndex((i) => i.src === currentImage.src);

      if (currentIndex < props.album.length - 1) {
        setCurrentImage(props.album[currentIndex + 1]);
      }
    }
  }, [props.album, currentImage.src]);
  useEffect(() => {
    const navigate = (e: KeyboardEvent): void => {
      switch (e.code) {
        case "ArrowLeft":
          slideLeft();
          break;
        case "ArrowRight":
          slideRight();
          break;
      }
    };
    const event = "keydown";
    document.addEventListener(event, navigate);

    return () => document.removeEventListener(event, navigate);
  });

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
              <NextImage
                src={currentImage.src}
                alt={currentImage.alt}
                layout={"fill"}
                loading={"eager"}
                quality={100}
              />
            </div>
            {currentImage.alt && <p className={styles.alt}>{currentImage.alt}</p>}
          </div>
        </Modal>
      )}
    </>
  );
};

export { ImageView };
