import React, { useMemo } from "react";
import type { IImage } from "../image";
import { Image } from "../image";
import styles from "./image-gallery.module.scss";

const ImageGallery: React.FC<{
  items: IImage[];
}> = (props) => {
  const items = useMemo(() => props.items.map((i, index) => <Image key={i.src + index} {...i} />), [props.items]);

  return <div className={styles.root}>{items}</div>;
};

export { ImageGallery };
