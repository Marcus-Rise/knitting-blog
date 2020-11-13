import { render } from "@testing-library/react";
import React from "react";
import { PostListItem } from "./post-list-item.component";

describe("PostListItem", () => {
  test("render", () => {
    const { asFragment } = render(
      <PostListItem
        title={"title"}
        slug={"slug"}
        description={"description"}
        date={"Ноябрь 11, 2020"}
        imageLabel={"image"}
        imageSrc={"http://test.com"}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
