import { render } from "@testing-library/react";
import { Ul } from "./ul.component";
import React from "react";

describe("Ul", () => {
  test("render", () => {
    const { asFragment } = render(<Ul items={["item", "item2"]} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
