import type { RichTextBlock } from "prismic-reactjs";
import type { SliceTypeEnum } from "../../server/post/repository";

interface Slice {
  type: SliceTypeEnum;
}

interface Image {
  width: number;
  height: number;
  alt: string | null;
  url: string;
}

interface IImageGallery extends Slice {
  type: SliceTypeEnum.IMAGE_GALLERY;
  label: string | null;
  items: Array<Image>;
}

type PostContentSlice = IImageGallery | RichTextBlock;

type IPostContent = PostContentSlice[];

export type { IPostContent, IImageGallery };
