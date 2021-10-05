import type { FC } from "react";
import React from "react";
import NextImage from "next/image";
import styled from "styled-components";
import { BadScript, colors } from "../../../styles";

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
    height: 200px;
    width: 320px;
  }

  img {
    object-fit: cover;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Label = styled.p`
  ${BadScript};
  color: ${colors.primary};
  text-align: center;
  margin: 0;
`;

const ImageGalleryItem: FC<IImage & { onClick?: () => void }> = ({ onClick, alt, src }) => (
  <Root>
    <ImageStyled onClick={onClick}>
      <NextImage
        src={src}
        alt={alt ?? ""}
        height={200}
        width={320}
        placeholder={"blur"}
        blurDataURL={
          "data:item/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcXw8AAeMBMA+N6mYAAAAASUVORK5CYII="
        }
      />
    </ImageStyled>
    {alt && <Label>{alt}</Label>}
  </Root>
);

export { ImageGalleryItem };
export type { IImage };
