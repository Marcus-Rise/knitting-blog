import type { FC } from "react";
import React, { useState } from "react";
import { Container, Hr, Slider } from "../../../components";
import Image from "next/image";
import { DateToString } from "../../../../common/utils/date-to-string";
import { PostContent } from "./post-content";
import type { IPost } from "../../../../common/post";
import { Footer, ImageStyled, Label, Meta, Title } from "./post-with-content.styles";

type IProps = IPost;

const PostWithContent: FC<IProps> = ({ content, date, imageLabel, imageSrc, title }) => {
  const dateStr = DateToString(date);
  const [showImage, setShowImage] = useState(false);

  return (
    <Container>
      <Title>{title}</Title>
      <Hr />
      <Meta>{dateStr}</Meta>
      {showImage && (
        <Slider
          images={[{ src: imageSrc, title: imageLabel }]}
          onClose={() => setShowImage(false)}
        />
      )}
      {imageSrc && (
        <ImageStyled onClick={() => setShowImage(true)}>
          <Image
            src={imageSrc}
            alt={imageLabel}
            layout={"fill"}
            priority
            placeholder={"blur"}
            blurDataURL={
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcXw8AAeMBMA+N6mYAAAAASUVORK5CYII="
            }
          />
        </ImageStyled>
      )}
      <Label>{imageLabel}</Label>

      <PostContent content={content} />

      <Footer>{dateStr}</Footer>
    </Container>
  );
};

export { PostWithContent };
