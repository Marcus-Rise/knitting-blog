import type { FC } from "react";
import React, { useMemo } from "react";
import type { IImage } from "../image";
import { Image } from "../image";
import styles from "./image-gallery.module.scss";
import { ImageView } from "../image-view";

const ImageGallery: FC<{
  items: IImage[];
}> = (props) => {
  const album = useMemo(
    () => props.items.map((i) => ({ src: i.src, alt: i.alt ?? "" })),
    [props.items],
  );
  const items = useMemo(
    () =>
      props.items.map((i, index) => (
        <ImageView key={i.src + index} currentIndex={index} album={album}>
          <Image {...i} />
        </ImageView>
      )),
    [props.items, album],
  );

  return (
    <>
      <div className={styles.root}>{items}</div>
    </>
  );
};

export { ImageGallery };
