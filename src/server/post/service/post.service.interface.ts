import type { IPost } from "../post.interface";

interface IPostService {
  readonly items: ReadonlyArray<IPost>;

  load(offset: number, limit?: number): Promise<void>;

  getBySlug(slug: string): Promise<IPost | null>;

  getPreview(ref: string): Promise<IPost | null>;
}

export type { IPostService };
