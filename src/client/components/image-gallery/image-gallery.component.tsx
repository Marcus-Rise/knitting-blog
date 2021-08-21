import type { FC } from "react";
import React, { useMemo } from "react";
import type { IImage } from "../image";
import { Image } from "../image";
import { ImageView } from "../image-view";
import styled from "styled-components";
import { media } from "../../styles";

const Root = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-gap: 1rem;

  grid-template-columns: repeat(3, auto);

  ${media.sm} {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ImageGallery: FC<{
  items: IImage[];
}> = (props) => {
  const album = useMemo(
    () => props.items.map((i) => ({ src: i.src, alt: i.alt ?? "" })),
    [props.items],
  );
  const items = useMemo(
    () =>
      props.items.map((i, index) => (
        <ImageView key={i.src + index} currentIndex={index} album={album}>
          <Image {...i} />
        </ImageView>
      )),
    [props.items, album],
  );

  return <Root>{items}</Root>;
};

export { ImageGallery };
