import type { FC } from "react";
import React, { useMemo } from "react";
import type { IImage } from "./item";
import { ImageGalleryItem } from "./item";
import { ImageView } from "../image-view";
import styled from "styled-components";

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  & > div {
    margin: 1rem;
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
          <ImageGalleryItem {...i} />
        </ImageView>
      )),
    [props.items, album],
  );

  return <Root>{items}</Root>;
};

export { ImageGallery };
