import { render } from "@testing-library/react";
import { MobileMenuButton } from "./mobile-menu-button.component";
import React from "react";

describe("MobileMenuButton", () => {
  test("render", () => {
    const { asFragment } = render(<MobileMenuButton onClick={() => undefined} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
