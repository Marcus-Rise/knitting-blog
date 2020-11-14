import { render } from "@testing-library/react";
import { Hr } from "./hr.component";
import React from "react";

describe("Hr", () => {
  test("render", () => {
    const { asFragment } = render(<Hr />);

    expect(asFragment()).toMatchSnapshot();
  });
});
