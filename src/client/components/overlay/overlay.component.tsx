import type { FC, MouseEventHandler } from "react";
import React, { useEffect } from "react";
import styled from "styled-components";

interface IProps {
  onClose?: () => void;
}

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 900;
  width: 100vw;
  height: 100vh;
  background-color: rgba(88, 88, 90, 0.5);
`;

const Overlay: FC<IProps> = ({ children, onClose }) => {
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

  return <Root onClick={onClick}>{children}</Root>;
};

export { Overlay };
