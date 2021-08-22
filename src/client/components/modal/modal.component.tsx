import type { FC } from "react";
import React, { useCallback, useEffect } from "react";
import { Overlay } from "../overlay";
import styled, { css } from "styled-components";

interface IProps {
  onClose: () => void;
  splash?: boolean;
}

const Splash = css`
  max-width: none;
  width: 100vw;
  height: 100vh;
  border: none;
  border-radius: 0;
`;

const Root = styled.div<{
  splash?: boolean;
}>`
  background-color: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-sizing: border-box;
  max-width: 80vw;

  ${(props) => props.splash && Splash}
`;

const Modal: FC<IProps> = ({ children, onClose, splash }) => {
  const onModalClick = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  useEffect(() => {
    const close = (e: KeyboardEvent): void => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    const event = "keydown";
    document.addEventListener(event, close);

    return () => document.removeEventListener(event, close);
  });

  return (
    <Overlay onClose={onClose}>
      <Root splash={splash} onClick={onModalClick}>
        {children}
      </Root>
    </Overlay>
  );
};

export { Modal };
