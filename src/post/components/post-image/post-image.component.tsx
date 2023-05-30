"use client";

import type { ImageLoader } from "next/image";
import NextImage from "next/image";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof NextImage>;

const prismicImageLoader: ImageLoader = ({ src, width, quality = 75 }) => {
  const url = new URL(src);

  url.searchParams.set("w", width.toString());
  url.searchParams.set("auto", "compress,format,enhance");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("crop", "entropy");
  url.searchParams.set("q", quality.toString());

  return url.href;
};

const PostImage: FC<Props> = (props) => (
  <NextImage {...props} placeholder={"empty"} loader={prismicImageLoader} />
);

export { PostImage };
