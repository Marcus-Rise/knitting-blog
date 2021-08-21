import { render } from "@testing-library/react";
import { PostList } from "./post-list.component";
import React from "react";
import type { IPost } from "../../../../common/post";

jest.mock("../post-list-item", () => ({
  __esModule: true,
  PostListItem: jest.fn((props) => <div data-testid={`item-${props.slug}`} />),
}));

describe("PostList", () => {
  test("render", () => {
    const item: IPost = {
      title: "Как вязать красиво",
      slug: "slugslugslugslug",
      date: "2020-11-11T17:47:51+0000",
      description:
        "Хобби — неотъемлемая часть нашей жизни. Они помогают привести нервы в порядок, успокоиться и  после трудового дня. Кто-то играет на гитаре, другие читают книги или пишут картины.  Кто-то выбирает вязание — один из самых популярных видов досуга в мире.",
      imageLabel: "Милый кролик",
      imageSrc: "http://test.com",
      content: [],
    };
    const { asFragment } = render(<PostList items={[item]} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
