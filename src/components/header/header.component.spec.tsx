import { render } from "@testing-library/react";
import { Header } from "./header.component";
import React from "react";

describe("Header", () => {
  test("render", () => {
    const { asFragment } = render(<Header logoSize={50} title={"title"} logoSrc={"http://test.com"} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
