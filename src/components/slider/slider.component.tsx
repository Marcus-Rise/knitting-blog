import type { FC } from "react";
import { useEffect } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import styles from "./slider.module.scss";

type Props = { images: Array<{ url: string }>; startIndex: number; onClose: () => void };

const Slider: FC<Props> = ({ images, startIndex, onClose }) => {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = "initial";
    };
  }, []);

  return (
    <>
      <button className={styles.button} onClick={onClose}>
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
  );
};

export { Slider };
