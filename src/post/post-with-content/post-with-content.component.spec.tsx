import { render } from "@testing-library/react";
import { PostWithContent } from "./post-with-content.component";
import React from "react";

jest.mock("../../utils/date-to-string", () => ({
  __esModule: true,
  DateToString: jest.fn((str) => str),
}));
jest.mock("../../components/image-view", () => ({
  __esModule: true,
  ImageView: jest.fn((props) => <div data-testid="image-view">{props.children}</div>),
}));
jest.mock("./post-content", () => ({
  __esModule: true,
  PostContent: jest.fn(() => <div data-testid={"content"} />),
}));

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
        content={[]}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
