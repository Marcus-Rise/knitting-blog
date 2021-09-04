import type { IPost } from "../../../common/post";
import type { IPostList } from "../../../common/post";

interface IPostService {
  readonly items: IPostList;
  readonly itemLastDate: Date | null;

  load(offset?: number, limit?: number): Promise<void>;

  getBySlug(slug: string): Promise<IPost | null>;

  getPreview(ref: string): Promise<IPost | null>;
}

export type { IPostService };
