import { fireEvent, render, screen } from "@testing-library/react";
import { Modal } from "./modal.component";
import React from "react";

jest.mock("../overlay", () => ({
  __esModule: true,
  Overlay: jest.fn((props) => (
    <div data-testid="overlay" onClick={props.onClose}>
      {props.children}
    </div>
  )),
}));

describe("Modal", () => {
  test("close on click outside", () => {
    let close = false;
    const onClose = () => {
      close = true;
    };
    const modalText = "awd";

    render(<Modal onClose={onClose}>{modalText}</Modal>);

    fireEvent.click(screen.getByText(modalText));

    expect(close).toBeFalsy();

    fireEvent.click(screen.getByTestId("overlay"));

    expect(close).toBeTruthy();
  });
});
