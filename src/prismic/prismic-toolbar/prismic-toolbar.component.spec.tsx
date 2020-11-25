import { render } from "@testing-library/react";
import { PrismicToolbar } from "./prismic-toolbar.component";
import React from "react";

describe("PrismicToolbar", () => {
  test("render", () => {
    const { asFragment } = render(<PrismicToolbar repositoryName={"repo"} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
