import type { ImageLoader as Loader } from "next/image";

const imageLoader =
  (height?: number, forceWidth?: number): Loader =>
  ({ src, width, quality = 75 }) => {
    const url = new URL(src);
    url.searchParams.set("w", forceWidth?.toString() ?? width.toString());

    if (height) {
      url.searchParams.set("h", height.toString());
    }

    url.searchParams.set("auto", "compress,format,enhance");
    url.searchParams.set("fit", "crop");
    url.searchParams.set("crop", "entropy");
    url.searchParams.set("q", quality.toString());

    return url.href;
  };

export { imageLoader };
