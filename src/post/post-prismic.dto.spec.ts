import json from "./post-prismic-dto.json";
import type { IPostPrismicDto } from "./post-prismic.dto.interface";
import { PostPrismicDto } from "./post-prismic.dto";

describe("PostPrismicDto", () => {
  const object: IPostPrismicDto = json as IPostPrismicDto;
  const dto = new PostPrismicDto(object);

  test("title", () => {
    expect(dto.title).toEqual(object.data.title[0].text);
  });

  test("slug", () => {
    expect(dto.slug).toEqual(object.uid);
  });

  test("date", () => {
    expect(dto.date).toEqual(object.first_publication_date);
  });

  test("description", () => {
    expect(dto.description).toEqual(object.data.description[0].text);
  });

  test("imageSrc", () => {
    expect(dto.imageSrc).toEqual(object.data.main_image.url);
  });

  test("imageLabel", () => {
    const alt = object.data.main_image.alt;

    if (!alt) {
      expect(dto.imageLabel).toEqual("");
    } else {
      expect(dto.imageLabel.length).toBeGreaterThan(0);
    }
  });
});
