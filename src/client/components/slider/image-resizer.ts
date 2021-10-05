import { useMemo } from "react";
import type { ISliderImage } from "./slider-types";

const useImageResizer = (...images: ISliderImage[]): ISliderImage[] => {
  const deviceWidth = window.innerWidth;

  return useMemo(
    () =>
      images.map(({ src, title }) => {
        const url = new URL(src);

        if (url.origin === "https://images.prismic.io") {
          url.searchParams.set("fit", "clip");
          url.searchParams.set("w", String(deviceWidth));

          return { title, src: url.toString() };
        } else {
          return { title, src };
        }
      }),
    [deviceWidth, images],
  );
};

export { useImageResizer };
