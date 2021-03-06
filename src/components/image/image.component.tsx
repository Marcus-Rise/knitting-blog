import React from "react";
import styles from "./image.module.scss";
import NextImage from "next/image";
import type { IImage } from "./image.interface";

const Image: React.FC<IImage> = (props) => {
  return (
    <div className={styles.root}>
      <div className={styles.image}>
        <NextImage src={props.src} alt={props.alt ?? ""} height={320} width={"auto"} />
      </div>
      {props.alt && <p className={styles.label}>{props.alt}</p>}
    </div>
  );
};

export { Image };
