import type { FC } from "react";
import React from "react";
import Image from "next/image";
import NextLink from "next/link";
import { DateToString } from "../../../../common/utils/date-to-string";
import { ImageView } from "../../../components";
import type { IPost } from "../../../../common/post";
import {
  Center,
  Description,
  ImageStyled,
  Label,
  Link,
  Meta,
  Title,
} from "./post-list-item.styles";

interface IProps extends IPost {
  className?: string;
}

const PostListItem: FC<IProps> = ({
  className,
  date,
  description,
  imageLabel,
  imageSrc,
  slug,
  title,
}) => (
  <div className={className}>
    <Title>{title}</Title>
    <Meta>{DateToString(date)}</Meta>
    <ImageView album={[{ src: imageSrc, alt: imageLabel }]}>
      <ImageStyled>
        <Image src={imageSrc} alt={imageLabel} layout={"fill"} quality={75} />
      </ImageStyled>
    </ImageView>
    <Label>{imageLabel}</Label>
    <Description>{description}</Description>
    <Center>
      <Link>
        <NextLink
          href={{
            pathname: "/[slug]",
            query: { slug },
          }}
        >
          Читать далее
        </NextLink>
      </Link>
    </Center>
  </div>
);

export { PostListItem };
