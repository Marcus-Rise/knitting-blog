import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  const [currentImage, setCurrentImage] = useState<ImageItem>({ src: props.src, alt: props.alt });
  const close = useCallback(() => {
    setIsShow(false);
  }, []);
  const open = useCallback(() => {
    setIsShow(true);
  }, []);

  const currentIndex: number = useMemo(() => props.album?.findIndex((i) => i.src === currentImage.src) ?? -1, [
    props.album,
    currentImage.src,
  ]);

  const isNextExist: boolean = useMemo(() => {
    let res = false;

    if (props.album) {
      res = currentIndex < props.album.length - 1;
    }

    return res;
  }, [currentIndex, props.album]);

  const isBackExist: boolean = useMemo(() => {
    let res = false;

    if (props.album) {
      res = currentIndex > 0;
    }

    return res;
  }, [currentIndex, props.album]);

  const slideLeft = useCallback(() => {
    if (props.album && isBackExist) {
      setCurrentImage(props.album[currentIndex - 1]);
    }
  }, [props.album, currentIndex, isBackExist]);

  const slideRight = useCallback(() => {
    if (props.album && isNextExist) {
      setCurrentImage(props.album[currentIndex + 1]);
    }
  }, [props.album, currentIndex, isNextExist]);

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

  const buttonBack = useMemo(
    () => (
      <>
        {isBackExist && (
          <button
            className={styles.navigationButton}
            dangerouslySetInnerHTML={{ __html: "&#8249;" }}
            onClick={slideLeft}
          />
        )}
      </>
    ),
    [isBackExist, slideLeft],
  );

  const buttonNext = useMemo(
    () => (
      <>
        {isNextExist && (
          <button
            className={styles.navigationButton}
            dangerouslySetInnerHTML={{ __html: "&#8250;" }}
            onClick={slideRight}
          />
        )}
      </>
    ),
    [isNextExist, slideRight],
  );

  const image = useMemo(
    () => (
      <div>
        <div className={styles.image}>
          <NextImage src={currentImage.src} alt={currentImage.alt} layout={"fill"} loading={"eager"} quality={100} />
        </div>
        {currentImage.alt && <p className={styles.alt}>{currentImage.alt}</p>}
      </div>
    ),
    [currentImage],
  );

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
            <div className={styles.container}>
              {buttonBack}
              {image}
              {buttonNext}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export { ImageView };
