import { render } from "@testing-library/react";
import { Footer } from "./footer.component";
import React from "react";

describe("Footer", () => {
  test("render", () => {
    const { asFragment } = render(<Footer year={2020} author={"Author"} authorLink={"http"} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
