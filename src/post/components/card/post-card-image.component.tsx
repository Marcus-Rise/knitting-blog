"use client";

import NextImage from "next/image";
import type { FC } from "react";
import { imageLoader } from "../../../prismic";

const IMAGE_SIZE = 500;
const IMAGE_QUALITY = 60;

type Props = typeof NextImage["arguments"];

const PostCardImage: FC<Props> = (props) => {
  return (
    <NextImage
      {...props}
      placeholder={"blur"}
      width={IMAGE_SIZE}
      loader={imageLoader(IMAGE_SIZE, IMAGE_SIZE)}
      quality={IMAGE_QUALITY}
    />
  );
};

export { PostCardImage };
