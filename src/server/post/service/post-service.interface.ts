import type { PostPreviewModel, PostWithContentModel } from "../../../post/model";

interface IPostService {
  getAll(limit?: number, offsetPage?: number): Promise<PostPreviewModel[]>;

  getByUUID(uuid: string): Promise<PostWithContentModel | null>;

  getSlugByID(id: string): Promise<string | null>;

  getPreview(previewRef: string, documentId: string): Promise<PostWithContentModel | null>;
}

export type { IPostService };
