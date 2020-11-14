import { render } from "@testing-library/react";
import { PostWithContent } from "./post-with-content.component";
import React from "react";

describe("PostWithContent", () => {
  test("render", () => {
    const { asFragment } = render(
      <PostWithContent
        title={"title"}
        slug={"slug"}
        date={"11 Nov, 2020"}
        imageSrc={"http://test.com"}
        imageLabel={"image"}
        description={"descr"}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
