import type { IPostService } from "./post.service.interface";
import type { IPost } from "./post.interface";
import { injectable } from "inversify";

@injectable()
class PostServiceMock implements IPostService {
  async getList(limit: number): Promise<IPost[]> {
    const item = {
      title: "Как вязать красиво",
      slug: "slugslugslugslug",
      date: "Ноябрь 11, 2020",
      description:
        "Хобби — неотъемлемая часть нашей жизни. Они помогают привести нервы в порядок, успокоиться и  после трудового дня. Кто-то играет на гитаре, другие читают книги или пишут картины.  Кто-то выбирает вязание — один из самых популярных видов досуга в мире.",
      imageLabel: "Милый кролик",
      imageSrc: "https://cdn.pixabay.com/photo/2020/03/16/16/31/hare-4937565_1280.jpg",
    };

    return new Array(limit).fill(item);
  }
}

export { PostServiceMock };
