import { render } from "@testing-library/react";
import { PostList } from "./post-list.component";
import React from "react";
import type { IPost } from "../post.interface";

describe("PostList", () => {
  test("render", () => {
    const item: IPost = {
      title: "Как вязать красиво",
      slug: "slugslugslugslug",
      date: "Ноябрь 11, 2020",
      description:
        "Хобби — неотъемлемая часть нашей жизни. Они помогают привести нервы в порядок, успокоиться и  после трудового дня. Кто-то играет на гитаре, другие читают книги или пишут картины.  Кто-то выбирает вязание — один из самых популярных видов досуга в мире.",
      imageLabel: "Милый кролик",
      imageSrc: "http://test.com",
    };
    const { asFragment } = render(<PostList items={[item]} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
