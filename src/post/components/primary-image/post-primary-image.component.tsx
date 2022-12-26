"use client";

import NextImage from "next/image";
import type { FC } from "react";
import { imageLoader } from "../../../prismic";

const IMAGE_SIZE = 500;

type Props = typeof NextImage["arguments"];

const PostPrimaryImage: FC<Props> = (props) => (
  <NextImage
    {...props}
    placeholder={"blur"}
    width={IMAGE_SIZE}
    height={IMAGE_SIZE}
    loader={imageLoader(IMAGE_SIZE, IMAGE_SIZE)}
  />
);

export { PostPrimaryImage };
