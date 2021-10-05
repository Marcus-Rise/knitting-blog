import type { FC } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { Overlay } from "../overlay";
import { useSwipe } from "../swiper";

interface ISliderProps {
  images: Array<{ title?: string; src: string }>;
  onClose: () => void;
  startIndex?: number;
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;

const Image = styled.img`
  object-fit: contain;
  max-height: 100%;
  max-width: 100%;
  height: 100%;
  width: 100%;
`;

const NavigationButton = styled.button`
  border: none;
  position: absolute;
  opacity: 0;
  background-color: rgba(76, 76, 76, 0.61);
  height: 100%;
  width: 30%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;
  transition: opacity ease 0.25s;

  &:hover {
    opacity: initial;
    cursor: pointer;
  }

  &:active {
    background-color: rgba(76, 76, 76, 0.79);
  }
`;
const NavigationButtonLeft = styled(NavigationButton)`
  left: 0;
`;
const NavigationButtonRight = styled(NavigationButton)`
  right: 0;
`;

const NavigationButtonIcon = styled.img`
  height: 2rem;
  width: 2rem;
`;

const NavigationButtonIconLeft = styled(NavigationButtonIcon)`
  transform: rotate(180deg);
`;

const CloseButton = styled.button`
  z-index: 100;
  border: none;
  position: absolute;
  top: 1rem;
  right: 1rem;

  font-size: 2rem;
  color: white;

  padding: 0.5rem;
  border-radius: 100%;
  height: 3rem;
  width: 3rem;

  background-color: rgba(76, 76, 76, 0.61);

  &:hover {
    cursor: pointer;
    background-color: rgb(76, 76, 76);
  }
`;

const NavigationMapList = styled.ul`
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 1rem;
  border-radius: 1rem;
  background-color: rgb(76 76 76 / 61%);
`;

const NavigationMapListItem = styled.li<{ active?: boolean }>`
  border-radius: 100%;
  background-color: ${(props) => (!!props.active ? `transparent` : "white")};
  border: 0.15rem solid white;
  height: 1rem;
  width: 1rem;
  margin-bottom: 0;
  transition: background-color ease 0.25s;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  &:hover {
    cursor: pointer;
    background-color: transparent;
  }
`;

const NavigationMap: FC<{ length: number; index: number; onSelect: (i: number) => void }> = ({
  length,
  index,
  onSelect,
}) => {
  const items = useMemo(
    () =>
      new Array(length)
        .fill(0)
        .map((_, i) => (
          <NavigationMapListItem key={i} active={index === i} onClick={() => onSelect(i)} />
        )),
    [index, length, onSelect],
  );

  return (
    <nav>
      <NavigationMapList>{items}</NavigationMapList>
    </nav>
  );
};

const NavigationMapWrapper = styled.div`
  position: absolute;
  bottom: 1rem;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const KEY_DOWN_EVENT = "keydown";

const Slider: FC<ISliderProps> = ({ images, onClose, startIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const image = images[currentIndex];
  const wrapperRef = useRef(null);

  const navigateBack = useCallback(() => {
    setCurrentIndex((index) => {
      if (index === 0) {
        return images.length - 1;
      } else {
        return index - 1;
      }
    });
  }, [images.length]);

  const navigateNext = useCallback(() => {
    setCurrentIndex((index) => {
      if (index === images.length - 1) {
        return 0;
      } else {
        return index + 1;
      }
    });
  }, [images.length]);

  useSwipe(wrapperRef, { onLeft: navigateNext, onRight: navigateBack });

  const keyDownEventHandler = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      switch (e.code) {
        case "ArrowLeft": {
          navigateBack();
          break;
        }
        case "ArrowRight": {
          navigateNext();
          break;
        }
        case "ArrowDown": {
          navigateBack();
          break;
        }
        case "ArrowUp": {
          navigateNext();
          break;
        }
        case "Escape": {
          onClose();
          break;
        }
      }
    },
    [navigateBack, navigateNext, onClose],
  );

  useEffect(() => {
    document.addEventListener(KEY_DOWN_EVENT, keyDownEventHandler);

    return () => {
      document.removeEventListener(KEY_DOWN_EVENT, keyDownEventHandler);
    };
  }, [keyDownEventHandler]);

  return (
    <Overlay color={"#2e2e2e"}>
      <CloseButton onClick={onClose}>{"X"}</CloseButton>
      <Wrapper ref={wrapperRef}>
        {images.length > 1 && (
          <NavigationButtonLeft onClick={navigateBack}>
            <NavigationButtonIconLeft src="/arrow-right.png" alt="navigate back" />
          </NavigationButtonLeft>
        )}
        <Image src={image.src} alt={image.title} />
        {images.length > 1 && (
          <NavigationButtonRight onClick={navigateNext}>
            <NavigationButtonIcon src="/arrow-right.png" alt="navigate next" />
          </NavigationButtonRight>
        )}
      </Wrapper>
      {images.length > 1 && (
        <NavigationMapWrapper>
          <NavigationMap length={images.length} index={currentIndex} onSelect={setCurrentIndex} />
        </NavigationMapWrapper>
      )}
    </Overlay>
  );
};

export { Slider };
export type { ISliderProps };
