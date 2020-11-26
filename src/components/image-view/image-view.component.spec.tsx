import { render, fireEvent, screen } from "@testing-library/react";
import { ImageView } from "./image-view.component";
import React from "react";

jest.mock("../modal", () => ({
  __esModule: true,
  Modal: jest.fn((props) => <div data-testid={"modal"}>{props.children}</div>),
}));

describe("ImageView", () => {
  const items = [
    { src: "/src1", alt: "alt" },
    { src: "/src2", alt: "alt" },
    { src: "/src3", alt: "alt" },
  ];
  test("close", () => {
    const [item] = items;
    render(
      <ImageView alt={item.alt} src={item.src}>
        <div data-testid="children" />
      </ImageView>,
    );

    expect(screen.queryByTestId("modal")).toBeNull();

    const children = screen.queryByTestId("children");
    expect(children).not.toBeNull();

    if (children) {
      fireEvent.click(children);
    }

    expect(screen.queryByTestId("modal")).not.toBeNull();

    const closeButton = screen.queryByText("X");
    expect(closeButton).not.toBeNull();

    if (closeButton) {
      fireEvent.click(closeButton);
    }

    expect(screen.queryByTestId("modal")).toBeNull();
  });
  test("navigation", () => {
    let [item] = items;
    render(
      <ImageView alt={item.alt} src={item.src} album={items}>
        <div data-testid="children" />
      </ImageView>,
    );

    const children = screen.queryByTestId("children");
    expect(children).not.toBeNull();

    if (children) {
      fireEvent.click(children);
    }

    let image = screen.queryByAltText(item.alt);
    expect(image).not.toBeNull();

    fireEvent.keyDown(document, { code: "ArrowRight" });
    item = items[1];
    image = screen.queryByAltText(item.alt);
    expect(image).not.toBeNull();

    fireEvent.keyDown(document, { code: "ArrowLeft" });
    item = items[0];
    image = screen.queryByAltText(item.alt);
    expect(image).not.toBeNull();
  });
});
