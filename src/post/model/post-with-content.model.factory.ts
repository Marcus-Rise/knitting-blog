import type { PostDocument } from "../../prismic";
import type { PostWithContentModel } from "./post-with-content.model";

abstract class PostWithContentModelFactory {
  static fromResponseDto(dto: PostDocument): PostWithContentModel {
    const title = dto.data.title.at(0)?.text ?? "";

    let imageSrc: string = "";

    const dtoUrl = dto.data.main_image.url;

    if (!!dtoUrl) {
      const url = new URL(dtoUrl);

      imageSrc = `${url.origin}${url.pathname}`;
    }

    return {
      title,
      description: dto.data.description.at(0)?.text ?? "",
      image: {
        src: imageSrc,
        alt: dto.data.main_image.alt ?? title,
        height: dto.data.main_image.dimensions?.height ?? 0,
        width: dto.data.main_image.dimensions?.width ?? 0,
        blurDataUrl: "",
      },
      date: dto.first_publication_date,
      content: dto.data.body,
    };
  }
}

export { PostWithContentModelFactory };
