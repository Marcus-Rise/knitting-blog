import type { FC } from "react";
import type { PostDocumentDataBodyImageGallerySlice } from "../../../../prismic";
import NextImage from "next/future/image";
import styles from "./post-slice-image-gallery.module.scss";

const PostSliceImageGallery: FC<{ slice: PostDocumentDataBodyImageGallerySlice }> = ({ slice }) => (
  <div className={styles.wrapper}>
    {slice.items.map(({ gallery_image: image }, index) => (
      <NextImage
        key={index}
        src={image.url ?? ""}
        alt={image.alt ?? ""}
        height={100}
        width={100}
        className={styles.image}
      />
    ))}
  </div>
);

export { PostSliceImageGallery };
