import type { ImageLoader as Loader } from "next/future/image";

const imageLoader: Loader = ({ src, width, quality = 75 }) =>
  src + "?w=" + width + "&q=" + quality + "&auto=compress,format";

export { imageLoader };
