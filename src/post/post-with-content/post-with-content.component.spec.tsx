import { render } from "@testing-library/react";
import { PostWithContent } from "./post-with-content.component";
import React from "react";

describe("PostWithContent", () => {
  test("render", () => {
    const { asFragment } = render(
      <PostWithContent
        title={"title"}
        slug={"slug"}
        date={"2020-11-11T17:47:51+0000"}
        imageSrc={"http://test.com"}
        imageLabel={"image"}
        description={"descr"}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
