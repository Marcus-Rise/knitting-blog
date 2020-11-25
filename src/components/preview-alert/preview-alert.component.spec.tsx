import { render } from "@testing-library/react";
import React from "react";
import { PreviewAlert } from "./preview-alert.component";

jest.mock("next/link", () => ({
  __esModule: true,
  default: jest.fn((props) => <>{props.children}</>),
}));

describe("PreviewAlert", () => {
  test("render", () => {
    const { asFragment } = render(<PreviewAlert title={"Post title"} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
