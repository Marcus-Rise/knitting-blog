import type { FC } from "react";
import React, { useMemo } from "react";
import NextImage from "next/image";
import styled from "styled-components";
import { BadScript, colors, media } from "../../styles";

const ImageStyled = styled.div`
  grid-area: image;
  display: grid;
  grid-template-rows: 2fr 1fr;
  grid-row-gap: 1rem;

  & > div {
    position: relative !important;
    overflow: auto !important;
    height: 80vh;

    ${media.sm} {
      height: 70vh;
    }
  }

  img {
    width: 100vw !important;
    height: 100vh !important;
    object-fit: contain !important;
  }
`;

const Label = styled.p`
  ${BadScript};

  color: ${colors.primary};
  text-align: center;
  font-size: 2rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0;
  display: inline-block;

  ${media.sm} {
    font-size: 1.5rem;
  }
`;

const ImageBox: FC<{ src: string; alt?: string }> = ({ src, alt }) => {
  const Alt = useMemo(() => alt && <Label title={alt}>{alt}</Label>, [alt]);

  return (
    <ImageStyled>
      <NextImage
        src={src}
        alt={alt}
        layout={"fill"}
        quality={100}
        placeholder={"blur"}
        blurDataURL={
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNcXw8AAeMBMA+N6mYAAAAASUVORK5CYII="
        }
      />
      {Alt}
    </ImageStyled>
  );
};

export { ImageBox };
