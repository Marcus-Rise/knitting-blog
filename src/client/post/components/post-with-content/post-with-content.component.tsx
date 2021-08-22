import type { FC } from "react";
import React from "react";
import { Container, Hr, ImageView } from "../../../components";
import Image from "next/image";
import { DateToString } from "../../../../common/utils/date-to-string";
import { PostContent } from "./post-content";
import type { IPost } from "../../../../common/post";
import { Footer, ImageStyled, Label, Meta, Title } from "./post-with-content.styles";

type IProps = IPost;

const PostWithContent: FC<IProps> = ({ content, date, imageLabel, imageSrc, title }) => {
  const dateStr = DateToString(date);

  return (
    <>
      <Title>{title}</Title>
      <Hr />
      <Meta>{dateStr}</Meta>
      {imageSrc && (
        <ImageView album={[{ src: imageSrc, alt: imageLabel }]}>
          <ImageStyled>
            <Image src={imageSrc} alt={imageLabel} layout={"fill"} priority />
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
