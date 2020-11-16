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
        date={"2020-11-11T17:47:51+0000"}
        imageLabel={"image"}
        imageSrc={"http://test.com"}
        content={[]}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
