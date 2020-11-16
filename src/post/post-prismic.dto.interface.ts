import type { Document } from "prismic-javascript/types/documents";
import type { RichTextBlock } from "prismic-reactjs";

enum SliceTypeEnum {
  TEXT = "text",
  IMAGE_GALLERY = "image_gallery",
}

interface Slice {
  slice_type: SliceTypeEnum;
  slice_label: null;
  primary: unknown;
}

interface TextSlice extends Slice {
  slice_type: SliceTypeEnum.TEXT;
  primary: {
    text: RichTextBlock[];
  };
}

interface Image {
  dimensions: {
    width: number;
    height: number;
  };
  alt: string | null;
  copyright: string | null;
  url: string;
}

interface ImageGallerySlice extends Slice {
  slice_type: SliceTypeEnum.IMAGE_GALLERY;
  primary: {
    name_of_the_gallery: string[];
  };
  items: Array<{
    image_captions: unknown[];
    gallery_image: Image;
  }>;
}

type BodySlice = TextSlice | ImageGallerySlice;

interface Text {
  type: string;
  text: string;
  spans: unknown[];
}

interface IPostPrismicDto extends Document {
  data: {
    title: Array<Text>;
    main_image: Image;
    description: Array<Text>;
    body: BodySlice[];
  };
}

export type { IPostPrismicDto };
export { SliceTypeEnum };
