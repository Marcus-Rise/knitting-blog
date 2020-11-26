import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal } from "../modal";
import NextImage from "next/image";
import styles from "./image-view.module.scss";

interface ImageItem {
  src: string;
  alt: string;
}

interface IProps {
  currentIndex?: number;
  album: ImageItem[];
}

const ImageView: React.FC<IProps> = (props) => {
  const [isShow, setIsShow] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(props.currentIndex ?? 0);
  const close = useCallback(() => {
    setIsShow(false);
  }, []);
  const open = useCallback(() => {
    setIsShow(true);
  }, []);

  const isNextExist: boolean = useMemo(() => currentIndex < props.album.length - 1, [currentIndex, props.album]);
  const isBackExist: boolean = useMemo(() => currentIndex > 0, [currentIndex]);

  const slideLeft = useCallback(() => {
    setCurrentIndex((index) => index - 1);
  }, []);
  const slideRight = useCallback(() => {
    setCurrentIndex((index) => index + 1);
  }, []);

  useEffect(() => {
    const navigate = (e: KeyboardEvent): void => {
      switch (e.code) {
        case "ArrowLeft":
          if (isBackExist) {
            slideLeft();
          }
          break;
        case "ArrowRight":
          if (isNextExist) {
            slideRight();
          }
          break;
      }
    };
    const event = "keydown";
    document.addEventListener(event, navigate);

    return () => document.removeEventListener(event, navigate);
  }, [isBackExist, isNextExist, slideLeft, slideRight]);

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

  const image = useMemo(() => {
    const currentImage = props.album[currentIndex];

    return (
      <div>
        <div className={styles.image}>
          <NextImage src={currentImage.src} alt={currentImage.alt} layout={"fill"} loading={"eager"} quality={100} />
        </div>
        {currentImage.alt && <p className={styles.alt}>{currentImage.alt}</p>}
      </div>
    );
  }, [currentIndex, props.album]);

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
