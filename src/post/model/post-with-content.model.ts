import type { Content } from "@prismicio/client";

type PostWithContentModel = {
  title: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
  date: string;
  content: Content.PostDocumentData["body"];
};

export type { PostWithContentModel };
