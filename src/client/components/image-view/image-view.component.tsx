import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal } from "../modal";
import NextImage from "next/image";
import styles from "./image-view.module.scss";
import classNames from "classnames";

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
  const setInitialCurrentIndex = useCallback(
    (): number => props.currentIndex ?? 0,
    [props.currentIndex],
  );
  const [currentIndex, setCurrentIndex] = useState<number>(setInitialCurrentIndex);

  const close = useCallback(() => {
    setIsShow(false);
    setCurrentIndex(setInitialCurrentIndex);
  }, [setInitialCurrentIndex]);

  const open = useCallback(() => {
    setIsShow(true);
  }, []);

  const isNextExist: boolean = useMemo(
    () => currentIndex < props.album.length - 1,
    [currentIndex, props.album],
  );
  const isBackExist: boolean = useMemo(() => currentIndex > 0, [currentIndex]);

  const slideLeft = useCallback(() => {
    setCurrentIndex((index) => index - 1);
  }, []);
  const slideRight = useCallback(() => {
    setCurrentIndex((index) => index + 1);
  }, []);

  const navigate = useCallback(
    (e: KeyboardEvent): void => {
      if (isShow) {
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
      }
    },
    [isShow, isBackExist, slideLeft, isNextExist, slideRight],
  );

  useEffect(() => {
    const event = "keydown";
    document.addEventListener(event, navigate);

    return () => document.removeEventListener(event, navigate);
  }, [navigate]);

  const buttonBack = useMemo(
    () => (
      <>
        {isBackExist && (
          <button
            className={classNames(styles.navigationButton, styles.navigationBack)}
            onClick={slideLeft}
          >
            ‹
          </button>
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
            className={classNames(styles.navigationButton, styles.navigationNext)}
            onClick={slideRight}
          >
            ›
          </button>
        )}
      </>
    ),
    [isNextExist, slideRight],
  );

  const currentImage = props.album[currentIndex];

  const ModalWrapper: React.FC = useCallback(
    (props) => (
      <Modal onClose={close} splash>
        <div className={styles.root}>
          <div className={styles.header}>
            <button className={styles.close} onClick={close}>
              X
            </button>
          </div>
          <div className={styles.container}>{props.children}</div>
        </div>
      </Modal>
    ),
    [close],
  );

  const Alt = useMemo(
    () => (
      <>
        {currentImage.alt && (
          <p className={styles.alt} title={currentImage.alt}>
            {currentImage.alt}
          </p>
        )}
      </>
    ),
    [currentImage.alt],
  );

  return (
    <>
      <div className={styles.preview} onClick={open}>
        {props.children}
      </div>
      {isShow && (
        <ModalWrapper>
          {buttonBack}
          <div className={styles.image}>
            <NextImage
              src={currentImage.src}
              alt={currentImage.alt}
              layout={"fill"}
              loading={"eager"}
              quality={100}
            />
            {Alt}
          </div>
          {buttonNext}
        </ModalWrapper>
      )}
    </>
  );
};

export { ImageView };
