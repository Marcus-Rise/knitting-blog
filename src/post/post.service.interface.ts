import type { IPost } from "./post.interface";

const POST_SERVICE_PROVIDER = Symbol("IPostService");

interface IPostService {
  getList(limit: number, offset: number): Promise<IPost[]>;
  getBySlug(slug: string): Promise<IPost | null>;
}

export type { IPostService };
export { POST_SERVICE_PROVIDER };
