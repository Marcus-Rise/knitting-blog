import type { FC } from "react";
import styled from "styled-components";

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
  width: 50%;
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

const CloseButton = styled.button`
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

const Slider: FC<ISliderProps> = ({ images, onClose }) => {
  const [image] = images;

  return (
    <Root>
      <CloseButton onClick={onClose}>{"X"}</CloseButton>
      <Wrapper>
        <NavigationButtonLeft>{"<"}</NavigationButtonLeft>
        <Image src={image.src} alt={image.title} />
        <NavigationButtonRight>{">"}</NavigationButtonRight>{" "}
      </Wrapper>
    </Root>
  );
};

export { Slider };
export type { ISliderProps };
