import type { IFindCriteria, IPostRepository } from "./post.repository.interface";
import type { IPost } from "./post.interface";
import { injectable } from "inversify";

@injectable()
class PostInMemoryRepository implements IPostRepository {
  private readonly items: IPost[] = [];

  constructor() {
    const COUNT = 10;

    while (this.items.length < COUNT) {
      this.items.push(PostInMemoryRepository.generatePost(`slug${this.items.length}`));
    }
  }

  async find(criteria?: IFindCriteria): Promise<IPost | null> {
    const item = this.items.find((i) => PostInMemoryRepository.searchPredicate(i, criteria));

    return item ?? null;
  }

  async list(criteria?: IFindCriteria, offset?: number, limit?: number): Promise<IPost[]> {
    const found = this.items.filter((i) => PostInMemoryRepository.searchPredicate(i, criteria));

    const end = (offset ?? 0) + (limit ?? this.items.length);

    return found.slice(offset, end);
  }

  private static searchPredicate(i: IPost, criteria?: IFindCriteria): boolean {
    let res = true;

    if (criteria?.slug) {
      res = i.slug === criteria.slug;
    } else if (criteria?.title) {
      res = i.title === criteria.title;
    }

    return res;
  }

  private static generatePost(slug = "slugslugslugslug"): IPost {
    return {
      title: "Как вязать красиво",
      slug,
      date: "Ноябрь 11, 2020",
      description:
        "Хобби — неотъемлемая часть нашей жизни. Они помогают привести нервы в порядок, успокоиться и  после трудового дня. Кто-то играет на гитаре, другие читают книги или пишут картины.  Кто-то выбирает вязание — один из самых популярных видов досуга в мире.",
      imageLabel: "Милый кролик",
      imageSrc: "https://cdn.pixabay.com/photo/2020/03/16/16/31/hare-4937565_1280.jpg",
    };
  }
}

export { PostInMemoryRepository };
