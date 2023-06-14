import NextImage from "next/image";
import type { ComponentProps, FC } from "react";

type Props = ComponentProps<typeof NextImage>;

const PostImage: FC<Props> = (props) => <NextImage {...props} placeholder={"empty"} />;

export { PostImage };
