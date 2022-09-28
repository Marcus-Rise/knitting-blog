import type { ImageLoader as Loader } from "next/future/image";

const ImageLoader: Loader = ({ src, width, quality }) => {
  const url = new URL(src);

  url.searchParams.set("w", width + "");

  if (quality) {
    url.searchParams.set("q", quality + "");
  }

  url.searchParams.set("auto", "compress,format");

  return url.toString();
};

export { ImageLoader };
