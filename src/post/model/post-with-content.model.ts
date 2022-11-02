import type { Content } from "@prismicio/client";
import type { PostImageModel } from "./post-image.model";

type PostWithContentModel = {
  slug: string;
  title: string;
  description: string;
  image: PostImageModel;
  date: string;
  content: Content.PostDocumentData["body"];
};

export type { PostWithContentModel };
