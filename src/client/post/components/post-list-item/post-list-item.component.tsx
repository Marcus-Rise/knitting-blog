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
import { useAmp } from "next/amp";

interface IProps extends IPost {
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
  const isAmp = useAmp();

  return (
    <div className={className}>
      <Title>{title}</Title>
      <Meta>{DateToString(date)}</Meta>
      {isAmp ? (
        <amp-img
          height={"100vh"}
          width={"auto"}
          src={imageSrc}
          alt={imageLabel}
          layout={"fixed-height"}
        />
      ) : (
        <ImageView album={[{ src: imageSrc, alt: imageLabel }]}>
          <ImageStyled>
            <Image
              src={imageSrc}
              alt={imageLabel}
              layout={"fill"}
              quality={25}
              placeholder={"blur"}
              priority={priority}
              blurDataURL={
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcXw8AAeMBMA+N6mYAAAAASUVORK5CYII="
              }
            />
          </ImageStyled>
        </ImageView>
      )}
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
