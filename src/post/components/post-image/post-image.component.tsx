import NextImage from "next/image";
import type { ComponentProps, FC } from "react";
import Placeholder from "./post-image-placeholder.png";

type Props = Omit<ComponentProps<typeof NextImage>, "placeholder" | "blurDataURL">;

const PostImage: FC<Props> = (props) => (
  <NextImage {...props} blurDataURL={Placeholder.blurDataURL} placeholder={"blur"} />
);

export { PostImage };
