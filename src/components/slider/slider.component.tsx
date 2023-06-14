"use client";

import type { FC, PropsWithChildren } from "react";
import { useCallback, useEffect, useState } from "react";
import styles from "./slider.module.scss";
import dynamic from "next/dynamic";

const SimpleImageSlider = dynamic(() => import("react-simple-image-slider"));

type Props = PropsWithChildren<{
  className?: string;
  images: Array<{ url: string }>;
  startIndex?: number;
  onClose?: () => void;
}>;

const Slider: FC<Props> = ({ className, images, startIndex = 0, onClose, children }) => {
  const [open, setOpen] = useState(false);
  const disallowScroll = useCallback(() => {
    const body = document.getElementsByTagName("body")[0];

    body.style.overflow = "hidden";
  }, []);

  const allowScroll = useCallback(() => {
    const body = document.getElementsByTagName("body")[0];

    body.style.overflow = "initial";
  }, []);

  useEffect(() => {
    if (open) {
      disallowScroll();
    } else {
      allowScroll();
    }
  }, [allowScroll, disallowScroll, open]);

  return (
    <div className={className} onClick={() => setOpen(true)}>
      {open && (
        <>
          <button
            className={styles.button}
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
          >
            X
          </button>
          <div className={styles.wrapper}>
            <SimpleImageSlider
              width={"100%"}
              height={"100%"}
              images={images}
              showBullets={true}
              showNavs={true}
              startIndex={startIndex}
            />
          </div>
        </>
      )}
      {children}
    </div>
  );
};

export { Slider };
