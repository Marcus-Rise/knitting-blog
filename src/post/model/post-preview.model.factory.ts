import type { PostPreviewModel } from "./post-preview.model";
import type { PostDocument } from "../../prismic";

abstract class PostPreviewModelFactory {
  static fromResponseDto(dto: PostDocument): PostPreviewModel {
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
      slug: dto.uid,
      image: {
        src: imageSrc,
        alt: dto.data.main_image.alt ?? title,
        height: dto.data.main_image.dimensions?.height ?? 0,
        width: dto.data.main_image.dimensions?.width ?? 0,
        blurDataUrl: "",
      },
      date: new Date(dto.first_publication_date),
    };
  }
}

export { PostPreviewModelFactory };
