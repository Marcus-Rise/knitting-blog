"use client";

import type { FC } from "react";
import { useCallback, useMemo, useState } from "react";
import type { PostDocumentDataBodyImageGallerySlice } from "../../../../prismic";
import { imageLoader } from "../../../../prismic";
import NextImage from "next/image";
import styles from "./post-slice-image-gallery.module.scss";
import dynamic from "next/dynamic";

const Slider = dynamic(() =>
  import("../../../../components/slider").then((module) => module.Slider),
);

const IMAGE_SIZE = 350;

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
          // @ts-ignore
          blurDataUrl: i.gallery_image.blurDataUrl,
        };
      }),
    [slice.items],
  );

  const closeSlider = useCallback(() => setSliderStartIndex(null), []);

  return (
    <div className={styles.wrapper}>
      {images.map((image, index) => (
        <NextImage
          key={index}
          src={image.url}
          alt={image.alt}
          height={IMAGE_SIZE}
          width={IMAGE_SIZE}
          className={styles.image}
          placeholder={"blur"}
          blurDataURL={image.blurDataUrl}
          onClick={() => setSliderStartIndex(index)}
          loader={imageLoader(IMAGE_SIZE, IMAGE_SIZE)}
        />
      ))}
      {sliderStartIndex !== null && (
        <Slider startIndex={sliderStartIndex} images={images} onClose={closeSlider} />
      )}
    </div>
  );
};

export { PostSliceImageGallery };
