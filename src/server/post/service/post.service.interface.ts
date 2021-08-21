import type { IPost } from "../post.interface";

interface IPostService {
  getList(offset: number, limit?: number): Promise<IPost[]>;

  getBySlug(slug: string): Promise<IPost | null>;

  getById(id: string): Promise<IPost | null>;

  getPreview(ref: string): Promise<IPost | null>;

  getForMainPage(): Promise<IPost[]>;
}

export type { IPostService };
