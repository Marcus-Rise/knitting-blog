import type { FC } from "react";
import React from "react";
import { Container, Hr, ImageView } from "../../../components";
import Image from "next/image";
import { DateToString } from "../../../../common/utils/date-to-string";
import { PostContent } from "./post-content";
import type { IPost } from "../../../../common/post";
import { Footer, ImageStyled, Label, Meta, Title } from "./post-with-content.styles";
import { useAmp } from "next/amp";

type IProps = IPost;

const PostWithContent: FC<IProps> = ({ content, date, imageLabel, imageSrc, title }) => {
  const dateStr = DateToString(date);
  const isAmp = useAmp();

  return (
    <>
      <Title>{title}</Title>
      <Hr />
      <Meta>{dateStr}</Meta>
      {imageSrc && (
        <ImageView album={[{ src: imageSrc, alt: imageLabel }]}>
          <ImageStyled>
            {isAmp ? (
              <amp-img
                height={"100vh"}
                width={"75vw"}
                src={imageSrc}
                alt={imageLabel}
                layout={"fixed-height"}
              />
            ) : (
              <Image
                src={imageSrc}
                alt={imageLabel}
                layout={"fill"}
                quality={25}
                priority
                placeholder={"blur"}
                blurDataURL={
                  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcXw8AAeMBMA+N6mYAAAAASUVORK5CYII="
                }
              />
            )}
          </ImageStyled>
        </ImageView>
      )}
      <Label>{imageLabel}</Label>

      <Container>
        <PostContent content={content} />

        <Footer>{dateStr}</Footer>
      </Container>
    </>
  );
};

export { PostWithContent };
