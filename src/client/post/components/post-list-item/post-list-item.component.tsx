import type { FC } from "react";
import React, { useState } from "react";
import Image from "next/image";
import NextLink from "next/link";
import { DateToString } from "../../../../common/utils/date-to-string";
import { Slider } from "../../../components";
import {
  Center,
  Description,
  ImageStyled,
  Label,
  Link,
  Meta,
  Title,
} from "./post-list-item.styles";
import type { IPostWithoutContent } from "../../../../common/post";

interface IProps extends IPostWithoutContent {
  className?: string;
  priority?: boolean;
}

const PostListItem: FC<IProps> = ({
  className,
  date,
  description,
  imageLabel,
  imageSrc,
  slug,
  title,
  priority,
}) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <div className={className}>
      <Title>{title}</Title>
      <Meta>{DateToString(date)}</Meta>
      {showImage && (
        <Slider
          images={[{ src: imageSrc, title: imageLabel }]}
          onClose={() => setShowImage(false)}
        />
      )}
      <ImageStyled onClick={() => setShowImage(true)}>
        <Image
          src={imageSrc}
          alt={imageLabel}
          layout={"fill"}
          placeholder={"blur"}
          priority={priority}
          blurDataURL={
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcXw8AAeMBMA+N6mYAAAAASUVORK5CYII="
          }
        />
      </ImageStyled>
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
};

export { PostListItem };
