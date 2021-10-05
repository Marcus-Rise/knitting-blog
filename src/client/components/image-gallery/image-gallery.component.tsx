import type { FC } from "react";
import React, { useMemo, useState } from "react";
import type { IImage } from "./item";
import { ImageGalleryItem } from "./item";
import { Slider } from "../slider";
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
  const [sliderIndex, setSliderIndex] = useState<number | null>(null);
  const album = useMemo(
    () => props.items.map((i) => ({ src: i.src, alt: i.alt ?? "" })),
    [props.items],
  );
  const items = useMemo(
    () =>
      props.items.map((i, index) => (
        <ImageGalleryItem
          key={i.src + index}
          {...i}
          onClick={() => {
            setSliderIndex(index);
          }}
        />
      )),
    [props.items],
  );

  return (
    <>
      {sliderIndex !== null && <Slider images={album} onClose={() => setSliderIndex(null)} />}
      <Root>{items}</Root>
    </>
  );
};

export { ImageGallery };
