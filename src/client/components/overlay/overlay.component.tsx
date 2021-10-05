import type { FC, MouseEventHandler } from "react";
import React, { useEffect } from "react";
import styled from "styled-components";

interface IOverlayProps {
  onClose?: () => void;
  color?: string;
}

const Root = styled.div<{ color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 900;
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.color};
`;

const Overlay: FC<IOverlayProps> = ({ children, onClose, color = "rgba(88, 88, 90, 0.5)" }) => {
  const onClick: MouseEventHandler = (e) => {
    e.stopPropagation();

    if (onClose) {
      onClose();
    }
  };

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    body.classList.add("modal");

    return () => {
      body.classList.remove("modal");
    };
  }, []);

  return (
    <Root onClick={onClick} color={color}>
      {children}
    </Root>
  );
};

export { Overlay };
