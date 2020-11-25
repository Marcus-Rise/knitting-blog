import { render } from "@testing-library/react";
import { PrismicToolbar } from "./prismic-toolbar.component";
import React from "react";

jest.mock("next/head", () => ({
  __esModule: true,
  default: jest.fn((props) => <div data-testid="head">{props.children}</div>),
}));

describe("PrismicToolbar", () => {
  test("render", () => {
    const { asFragment } = render(<PrismicToolbar repositoryName={"repo"} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
