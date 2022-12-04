"use client";

import NextImage from "next/image";
import type { FC } from "react";
import { imageLoader } from "../../../prismic";

type Props = typeof NextImage["arguments"];

const PostWithContentImage: FC<Props> = (props) => {
  return <NextImage {...props} priority placeholder={"blur"} loader={imageLoader()} />;
};

export { PostWithContentImage };
