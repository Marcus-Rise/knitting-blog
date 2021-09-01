import type { IPost } from "../../../common/post";

interface IPostService {
  readonly items: ReadonlyArray<IPost>;
  readonly itemLastDate: Date | null;

  load(offset?: number, limit?: number): Promise<void>;

  getBySlug(slug: string): Promise<IPost | null>;

  getPreview(ref: string): Promise<IPost | null>;
}

export type { IPostService };
