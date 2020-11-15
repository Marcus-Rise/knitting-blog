import type { IPost } from "./post.interface";
import type { IPostPrismicDto } from "./post-prismic.dto.interface";

class PostPrismicDto implements IPost {
  date: string;
  description: string;
  imageLabel: string;
  imageSrc: string;
  slug: string;
  title: string;

  constructor(dto: IPostPrismicDto) {
    this.title = dto.data.title[0].text;
    this.slug = dto.uid ?? dto.slugs[0];
    this.description = dto.data.description[0].text;
    this.imageSrc = dto.data.main_image.url;
    this.imageLabel = dto.data.main_image.alt;
    this.date = dto.first_publication_date ?? "";
  }
}

export { PostPrismicDto };
