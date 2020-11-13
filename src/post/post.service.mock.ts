import type { IPostService } from "./post.service.interface";
import type { IPost } from "./post.interface";
import { injectable } from "inversify";

@injectable()
class PostServiceMock implements IPostService {
  async getList(): Promise<IPost[]> {
    return [
      {
        title: "title",
        slug: "title",
        date: "Ноябрь 11, 2020",
        description: "descr",
        imageLabel: "image",
        imageSrc: "http://example.com",
      },
      {
        title: "title2",
        slug: "title2",
        date: "Ноябрь 11, 2020",
        description: "descr",
        imageLabel: "image",
        imageSrc: "http://example.com",
      },
      {
        title: "title3",
        slug: "title3",
        date: "Ноябрь 11, 2020",
        description: "descr",
        imageLabel: "image",
        imageSrc: "http://example.com",
      },
    ];
  }
}

export { PostServiceMock };
