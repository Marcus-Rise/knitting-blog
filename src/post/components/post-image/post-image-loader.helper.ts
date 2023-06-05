import type { ImageLoader } from "next/image";

const postImageLoader: ImageLoader = ({ src, width, quality = 75 }) => {
  const url = new URL(src);

  url.searchParams.set("w", width.toString());
  url.searchParams.set("auto", "compress,format,enhance");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("crop", "entropy");
  url.searchParams.set("q", quality.toString());

  return url.href;
};

export { postImageLoader };
