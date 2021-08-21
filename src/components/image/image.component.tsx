import type { FC } from "react";
import React from "react";
import styles from "./image.module.scss";
import NextImage from "next/image";

interface IImage {
  src: string;
  alt?: string | null;
}

const Image: FC<IImage> = ({ alt, src }) => (
  <div className={styles.root}>
    <div className={styles.image}>
      <NextImage src={src} alt={alt ?? ""} height={320} width={200} />
    </div>
    {alt && <p className={styles.label}>{alt}</p>}
  </div>
);

export { Image };
export type { IImage };
