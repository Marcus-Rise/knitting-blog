import type { PostPreviewModel, PostWithContentModel } from "../../../post/model";

interface IPostService {
  getAll(): Promise<PostPreviewModel[]>;

  getByUUID(uuid: string): Promise<PostWithContentModel | null>;

  getSlugByID(id: string): Promise<string | null>;
}

export type { IPostService };
