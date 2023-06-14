"use client";

import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import type { PostDocumentDataBodyImageGallerySlice } from "../../../../prismic";
import styles from "./post-slice-image-gallery.module.scss";
import dynamic from "next/dynamic";
import { PostImage } from "../../post-image";

const Slider = dynamic(() =>
  import("../../../../components/slider").then((module) => module.Slider),
);

const PostSliceImageGallery: FC<{ slice: PostDocumentDataBodyImageGallerySlice }> = ({ slice }) => {
  const [sliderStartIndex, setSliderStartIndex] = useState<number | null>(null);

  const images = useMemo(
    () =>
      slice.items.map((i) => {
        return {
          url: i.gallery_image.url ?? "",
          alt: i.gallery_image.alt ?? "",
          width: i.gallery_image.dimensions?.width,
          height: i.gallery_image.dimensions?.height,
        };
      }),
    [slice.items],
  );

  const closeSlider = useCallback(() => setSliderStartIndex(null), []);

  const cards = useMemo(
    () =>
      images.map((image, index) => (
        <PostImage
          key={index}
          src={image.url}
          alt={image.alt}
          height={image.height}
          width={image.width}
          sizes="(max-width: 768px) 100vw, 25vw"
          className={styles.image}
          onClick={() => setSliderStartIndex(index)}
        />
      )),
    [images],
  );

  return (
    <div className={styles.wrapper}>
      {cards}
      {sliderStartIndex !== null && (
        <Slider startIndex={sliderStartIndex} images={images} onClose={closeSlider} />
      )}
    </div>
  );
};

export { PostSliceImageGallery };
