import type { Content } from "@prismicio/client";
import type { PostImageModel } from "./post-image.model";

type PostWithContentModel = {
  slug: string;
  title: string;
  description: string;
  image: PostImageModel;
  date: Date;
  content: Content.PostDocumentData["body"];
  telegramPostUrl: string;
};

export type { PostWithContentModel };
