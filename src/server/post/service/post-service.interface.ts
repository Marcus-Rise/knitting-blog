import type { PostPreviewModel, PostWithContentModel } from "../../../post/model";
import type { PreviewData } from "next";

interface IPostService {
  getAll(limit?: number, offsetPage?: number): Promise<PostPreviewModel[]>;

  getByUUID(uuid: string): Promise<PostWithContentModel | null>;

  getSlugByID(id: string): Promise<string | null>;

  getPreview(preview: PreviewData): Promise<PostWithContentModel | null>;
}

export type { IPostService };
