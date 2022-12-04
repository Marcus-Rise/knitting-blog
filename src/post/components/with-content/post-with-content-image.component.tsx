"use client";

import NextImage from "next/image";
import type { FC } from "react";
import { imageLoader } from "../../../prismic";

const IMAGE_SIZE = 500;
const IMAGE_QUALITY = 60;

type Props = typeof NextImage["arguments"];

const PostWithContentImage: FC<Props> = (props) => (
  <NextImage
    {...props}
    priority
    placeholder={"blur"}
    width={IMAGE_SIZE}
    height={IMAGE_SIZE}
    quality={IMAGE_QUALITY}
    loader={imageLoader(IMAGE_SIZE)}
  />
);

export { PostWithContentImage };
