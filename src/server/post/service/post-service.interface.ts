import type { PostPreviewModel, PostWithContentModel } from "../../../post/model";
import type { PreviewData } from "next";

interface IPostService {
  getAll(): Promise<PostPreviewModel[]>;

  getByUUID(uuid: string): Promise<PostWithContentModel | null>;

  getSlugByID(id: string): Promise<string | null>;

  getPreview(preview: PreviewData): Promise<PostWithContentModel | null>;
}

export type { IPostService };
