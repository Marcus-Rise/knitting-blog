import type { IPost } from "./post.interface";

const POST_SERVICE_PROVIDER = Symbol("IPostService");

interface IPostService {
  getList(offset: number, limit?: number): Promise<IPost[]>;
  getBySlug(slug: string): Promise<IPost | null>;
  getById(id: string): Promise<IPost | null>;
}

export type { IPostService };
export { POST_SERVICE_PROVIDER };
