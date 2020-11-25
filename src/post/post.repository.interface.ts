import type { IPost } from "./post.interface";

const POST_REPOSITORY_PROVIDER = Symbol("IPostRepository");

interface IFindCriteria {
  slug?: string;
  id?: string;
  title?: string;
  previewRef?: string;
}

interface IPostRepository {
  list(criteria?: IFindCriteria, offset?: number, limit?: number): Promise<IPost[]>;
  find(criteria?: IFindCriteria): Promise<IPost | null>;
}

export type { IPostRepository, IFindCriteria };
export { POST_REPOSITORY_PROVIDER };
