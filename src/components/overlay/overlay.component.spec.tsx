import { render } from "@testing-library/react";
import { Overlay } from "./overlay.component";
import React from "react";

describe("Overlay", () => {
  test("render", () => {
    const { asFragment } = render(<Overlay />);

    expect(asFragment()).toMatchSnapshot();
  });
});
