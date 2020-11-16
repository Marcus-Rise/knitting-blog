import type { IPostService } from "./post.service.interface";
import type { IPost } from "./post.interface";
import { injectable } from "inversify";

@injectable()
class PostServiceMock implements IPostService {
  private readonly items: IPost[] = [];

  async getList(offset: number, limit: number): Promise<IPost[]> {
    if (!this.items.length || this.items.length < limit) {
      while (this.items.length < limit) {
        this.items.push(PostServiceMock.generatePost(`slug${this.items.length}`));
      }
    }

    return this.items;
  }

  async getBySlug(slug: string): Promise<IPost | null> {
    let post = this.items.find((i) => i.slug === slug);

    if (!post) {
      post = PostServiceMock.generatePost(slug);
      this.items.push(post);
    }

    return post;
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
      content: [],
    };
  }
}

export { PostServiceMock };
