import type { FC } from "react";
import type { PostDocumentDataBodyImageGallerySlice } from "../../../../prismic";
import styles from "./post-slice-image-gallery.module.scss";
import { PostImage } from "../../post-image";
import Slider from "../../../../components/slider";

const PostSliceImageGallery: FC<{ slice: PostDocumentDataBodyImageGallerySlice }> = ({ slice }) => {
  const images = slice.items.map((i) => ({
    url: i.gallery_image.url ?? "",
    alt: i.gallery_image.alt ?? "",
    width: i.gallery_image.dimensions?.width,
    height: i.gallery_image.dimensions?.height,
  }));

  const cards = images.map((image, index) => (
    <Slider key={index} className={styles.imageWrapper} images={images} startIndex={index}>
      <PostImage
        src={image.url}
        alt={image.alt}
        height={image.height}
        width={image.width}
        sizes="(min-width: 768px) 25vw"
        className={styles.image}
      />
    </Slider>
  ));

  return <div className={styles.wrapper}>{cards}</div>;
};

export { PostSliceImageGallery };
