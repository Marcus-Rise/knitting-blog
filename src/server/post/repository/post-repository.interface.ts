import type { PostPreviewModel, PostWithContentModel } from "../../../post/model";

type PostRepositoryQuery = {
  uuid: string;
  id: string;
  previewRef: string;
};

interface IPostRepository {
  list(): Promise<PostPreviewModel[]>;

  find(query?: Partial<PostRepositoryQuery>): Promise<PostWithContentModel | null>;
}

export type { IPostRepository, PostRepositoryQuery };
