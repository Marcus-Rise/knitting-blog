import type { IPostService } from "./post.service.interface";
import type { IPost } from "../post.interface";
import { inject, injectable } from "inversify";
import type { IPostRepository } from "../repository";
import { POST_REPOSITORY_PROVIDER } from "../repository";
import { isAfter } from "date-fns";

@injectable()
class PostService implements IPostService {
  constructor(
    @inject(POST_REPOSITORY_PROVIDER)
    private readonly repo: IPostRepository,
  ) {}

  get itemLastDate(): Date | null {
    return this._items.reduce<Date | null>((date, post) => {
      const postDate = new Date(post.date);

      if (date !== null && isAfter(postDate, date)) {
        return postDate;
      } else if (date === null) {
        return postDate;
      } else {
        return date;
      }
    }, null);
  }

  private _items: IPost[] = [];

  get items(): IPost[] {
    return this._items;
  }

  async load(offset: number, limit?: number): Promise<void> {
    this._items = await this.repo.list({}, offset, limit);
  }

  async getBySlug(slug: string): Promise<IPost | null> {
    return this.repo.find({ slug });
  }

  async getPreview(ref: string): Promise<IPost | null> {
    return this.repo.find({ previewRef: ref });
  }
}

export { PostService };
