import type { IFindCriteria, IPostRepository } from "./post.repository.interface";
import type { IPost } from "../../../common/post/post.interface";
import { inject, injectable } from "inversify";
import type { IPrismicService } from "../../prismic";
import { PRISMIC_SERVICE_PROVIDER } from "../../prismic";
import { PostPrismicDto } from "./post-prismic.dto";
import { classToPlain } from "class-transformer";
import Prismic from "prismic-javascript";

@injectable()
class PostPrismicRepository implements IPostRepository {
  constructor(@inject(PRISMIC_SERVICE_PROVIDER) private readonly prismic: IPrismicService) {}

  async find(criteria?: IFindCriteria): Promise<IPost | null> {
    let post: IPost | null = null;

    if (criteria?.previewRef) {
      await this.prismic.client
        .query(Prismic.Predicates.at("document.type", "post"), { ref: criteria.previewRef })
        .then((data) => {
          if (data) {
            post = new PostPrismicDto(data.results[0]);
            post = classToPlain(post) as IPost;
          }
        })
        .catch(console.error);
    } else if (criteria?.slug) {
      await this.prismic.client
        .getByUID("post", criteria.slug, {})
        .then((data) => {
          if (data) {
            post = new PostPrismicDto(data);
            post = classToPlain(post) as IPost;
          }
        })
        .catch(console.error);
    }

    return post;
  }

  async list(criteria?: IFindCriteria, offset?: number, limit?: number): Promise<IPost[]> {
    let items: IPost[] = [];

    await this.prismic.client
      .query(Prismic.Predicates.at("document.type", "post"), {
        orderings: "[document.first_publication_date desc]",
        pageSize: limit ?? "",
      })
      .then((data) => {
        items = data.results
          .map<IPost>((i) => new PostPrismicDto(i))
          .map((i) => classToPlain(i) as IPost);
      })
      .catch(console.error);

    return items;
  }
}

export { PostPrismicRepository };
