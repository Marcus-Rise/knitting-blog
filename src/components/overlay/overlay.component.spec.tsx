import { fireEvent, render, screen } from "@testing-library/react";
import { Overlay } from "./overlay.component";
import React from "react";

describe("Overlay", () => {
  test("render", () => {
    const { asFragment } = render(<Overlay />);

    expect(asFragment()).toMatchSnapshot();
  });
  test("click", () => {
    let isClose = false;
    const text = "awd";
    render(<Overlay onClose={() => (isClose = true)}>{text}</Overlay>);

    fireEvent.click(screen.getByText(text));
    expect(isClose).toBeTruthy();
  });
});
