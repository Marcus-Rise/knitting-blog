import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import ArrowRight from "../../assets/arrow-right.png";

interface ISliderProps {
  images: Array<{ title?: string; src: string }>;
  onClose: () => void;
}

const Root = styled.div`
  height: 100%;
  width: 100%;
  background-color: #2e2e2e;

  position: absolute;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  object-fit: scale-down;
  max-height: 100%;
  max-width: 100%;
`;

const NavigationButton = styled.button`
  border: none;
  position: absolute;
  opacity: 0;
  background-color: rgb(76 76 76 / 61%);
  height: 100%;
  width: 30%;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 2rem;

  &:hover {
    opacity: initial;
    cursor: pointer;
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

  background-color: #ffffff38;

  &:hover {
    cursor: pointer;
  }
`;

const NavigationMapList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
`;

const NavigationMapListItem = styled.li<{ active?: boolean }>`
  border-radius: 100%;
  background-color: ${(props) => (!!props.active ? `transparent` : "white")};
  border: 0.15rem solid white;
  height: 1rem;
  width: 1rem;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const NavigationMap: FC<{ length: number; index: number }> = ({ length, index }) => {
  const items = useMemo(
    () =>
      new Array(length)
        .fill(0)
        .map((_, i) => <NavigationMapListItem key={i} active={index === i} />),
    [index, length],
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

const Slider: FC<ISliderProps> = ({ images, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const image = images[currentIndex];

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

  return (
    <Root>
      <CloseButton onClick={onClose}>{"X"}</CloseButton>
      <Wrapper>
        <NavigationButtonLeft onClick={navigateBack}>
          <NavigationButtonIconLeft src={String(ArrowRight)} alt="navigate back" />
        </NavigationButtonLeft>
        <Image src={image.src} alt={image.title} />
        <NavigationButtonRight onClick={navigateNext}>
          <NavigationButtonIcon src={String(ArrowRight)} alt="navigate next" />
        </NavigationButtonRight>
      </Wrapper>
      <NavigationMapWrapper>
        <NavigationMap length={images.length} index={currentIndex} />
      </NavigationMapWrapper>
    </Root>
  );
};

export { Slider };
export type { ISliderProps };
