import type { IPostContent } from "./post-content.inteface";

interface IPost {
  title: string;
  slug: string;
  date: string;
  imageSrc: string;
  imageLabel: string;
  description: string;
  content: IPostContent;
}

export type { IPost };
