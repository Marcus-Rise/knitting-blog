import type { FC } from "react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Modal } from "../modal";
import NextImage from "next/image";
import {
  Close,
  Container,
  Header,
  ImageStyled,
  Label,
  NavigationButtonBack,
  NavigationButtonNext,
  Preview,
  Root,
} from "./image-view.styles";

interface ImageItem {
  src: string;
  alt: string;
}

interface IProps {
  currentIndex?: number;
  album: ImageItem[];
}

const ImageView: FC<IProps> = (props) => {
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
    () => isBackExist && <NavigationButtonBack onClick={slideLeft}>‹</NavigationButtonBack>,
    [isBackExist, slideLeft],
  );

  const buttonNext = useMemo(
    () => isNextExist && <NavigationButtonNext onClick={slideRight}>›</NavigationButtonNext>,
    [isNextExist, slideRight],
  );

  const currentImage = props.album[currentIndex];

  const ModalWrapper: FC = useCallback(
    (props) => (
      <Modal onClose={close} splash>
        <Root>
          <Header>
            <Close onClick={close}>X</Close>
          </Header>
          <Container>{props.children}</Container>
        </Root>
      </Modal>
    ),
    [close],
  );

  const Alt = useMemo(
    () => currentImage.alt && <Label title={currentImage.alt}>{currentImage.alt}</Label>,
    [currentImage.alt],
  );

  return (
    <>
      <Preview onClick={open}>{props.children}</Preview>
      {isShow && (
        <ModalWrapper>
          {buttonBack}
          <ImageStyled>
            <NextImage
              src={currentImage.src}
              alt={currentImage.alt}
              layout={"fill"}
              loading={"eager"}
              quality={100}
            />
            {Alt}
          </ImageStyled>
          {buttonNext}
        </ModalWrapper>
      )}
    </>
  );
};

export { ImageView };
