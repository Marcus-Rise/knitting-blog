import { PostSliceText } from "./text";
import { PostSliceImageGallery } from "./image-gallery";
import type { SliceZoneProps } from "@prismicio/react";

const components: SliceZoneProps["components"] = {
  text: PostSliceText,
  image_gallery: PostSliceImageGallery,
};

export { components };
