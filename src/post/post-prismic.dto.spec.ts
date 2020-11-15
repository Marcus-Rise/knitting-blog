import json from "./post-prismic.dto.json";
import { PostPrismicDto } from "./post-prismic.dto";

describe("PostPrismicDto", () => {
  test("constructor", () => {
    const dto = new PostPrismicDto(json);

    expect(dto.title).toEqual(json.data.title[0].text);
    expect(dto.slug).toEqual(json.uid);
    expect(dto.date).toEqual(json.first_publication_date);
    expect(dto.description).toEqual(json.data.description[0].text);
    expect(dto.imageSrc).toEqual(json.data.main_image.url);
    expect(dto.imageLabel).toEqual(json.data.main_image.alt);
  });
});
