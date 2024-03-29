import type { PostImageModel } from "./post-image.model";

type PostPreviewModel = {
  image: PostImageModel;
  title: string;
  description: string;
  slug: string;
  date: Date;
};

export type { PostPreviewModel };
