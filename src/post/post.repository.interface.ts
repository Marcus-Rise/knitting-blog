import type { IPost } from "./post.interface";

const POST_REPOSITORY_PROVIDER = Symbol("IPostRepository");

interface IFindCriteria {
  slug?: string;
  title?: string;
}

interface IPostRepository {
  list(criteria?: IFindCriteria, offset?: number, limit?: number): Promise<IPost[]>;
  find(criteria?: IFindCriteria): Promise<IPost | null>;
}

export type { IPostRepository };
export { POST_REPOSITORY_PROVIDER };
