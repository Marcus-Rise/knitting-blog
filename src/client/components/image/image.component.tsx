import type { FC } from "react";
import React from "react";
import NextImage from "next/image";
import styled from "styled-components";
import { BadScript, colors } from "../../styles";

interface IImage {
  src: string;
  alt?: string | null;
}

const Root = styled.div`
  display: grid;
  grid-template-rows: 3fr auto;
  grid-column-gap: 1rem;
`;

const ImageStyled = styled.div`
  & > div {
    margin: 0 auto !important;
    display: block !important;
  }

  img {
    object-fit: cover;
  }
`;

const Label = styled.p`
  ${BadScript};
  color: ${colors.primary};
  text-align: center;
  margin: 0;
`;

const Image: FC<IImage> = ({ alt, src }) => (
  <Root>
    <ImageStyled>
      <NextImage
        src={src}
        alt={alt ?? ""}
        height={320}
        width={200}
        quality={75}
        placeholder={"blur"}
        blurDataURL={
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcXw8AAeMBMA+N6mYAAAAASUVORK5CYII="
        }
      />
    </ImageStyled>
    {alt && <Label>{alt}</Label>}
  </Root>
);

export { Image };
export type { IImage };
