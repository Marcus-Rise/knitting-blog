import type { PostPreviewModel, PostWithContentModel } from "../../../post/model";

type PostRepositoryQuery = {
  uuid: string;
  id: string;
  previewRef: string;
  limit: number;
  offsetPage: number;
};

interface IPostRepository {
  list(query?: Partial<PostRepositoryQuery>): Promise<PostPreviewModel[]>;

  find(query?: Partial<PostRepositoryQuery>): Promise<PostWithContentModel | null>;
}

export type { IPostRepository, PostRepositoryQuery };
