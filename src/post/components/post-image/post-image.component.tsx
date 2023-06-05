"use client";

import NextImage from "next/image";
import type { ComponentProps, FC } from "react";
import { postImageLoader } from "./post-image-loader.helper";

type Props = ComponentProps<typeof NextImage>;

const PostImage: FC<Props> = (props) => (
  <NextImage {...props} placeholder={"empty"} loader={postImageLoader} />
);

export { PostImage };
