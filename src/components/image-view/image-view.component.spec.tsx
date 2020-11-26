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
    render(
      <ImageView album={items}>
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
  describe("navigation", () => {
    const checkImage = (index: number): void => {
      const image = items[index];
      const element = screen.queryByAltText(image.alt);
      expect(element).not.toBeNull();
    };
    const getBackButton = () => screen.queryByText("‹");
    const getNextButton = () => screen.queryByText("›");
    const goBackByKeyboard = () => fireEvent.keyDown(document, { code: "ArrowLeft" });
    const goBackByArrowButton = () => {
      const buttonBack = getBackButton();

      if (buttonBack) {
        fireEvent.click(buttonBack);
      }
    };
    const goNextByKeyboard = () => fireEvent.keyDown(document, { code: "ArrowRight" });
    const goNextByArrowButton = () => {
      const buttonNext = getNextButton();

      if (buttonNext) {
        fireEvent.click(buttonNext);
      }
    };

    test("next by keyboard", () => {
      render(
        <ImageView album={items}>
          <div data-testid="children" />
        </ImageView>,
      );
      const children = screen.queryByTestId("children");
      expect(children).not.toBeNull();

      if (children) {
        fireEvent.click(children);
      }

      checkImage(0);

      goNextByKeyboard();

      checkImage(1);
    });

    test("next by button", () => {
      render(
        <ImageView album={items}>
          <div data-testid="children" />
        </ImageView>,
      );
      const children = screen.queryByTestId("children");
      expect(children).not.toBeNull();

      if (children) {
        fireEvent.click(children);
      }

      checkImage(0);

      goNextByArrowButton();

      checkImage(1);
    });

    test("next is not exist", () => {
      render(
        <ImageView album={items} currentIndex={2}>
          <div data-testid="children" />
        </ImageView>,
      );
      const children = screen.queryByTestId("children");
      expect(children).not.toBeNull();

      if (children) {
        fireEvent.click(children);
      }

      checkImage(0);

      goNextByArrowButton();

      checkImage(0);
    });

    test("back by keyboard", () => {
      render(
        <ImageView album={items} currentIndex={2}>
          <div data-testid="children" />
        </ImageView>,
      );
      const children = screen.queryByTestId("children");
      expect(children).not.toBeNull();

      if (children) {
        fireEvent.click(children);
      }

      checkImage(1);

      goBackByKeyboard();

      checkImage(0);
    });

    test("back by button", () => {
      render(
        <ImageView album={items} currentIndex={2}>
          <div data-testid="children" />
        </ImageView>,
      );
      const children = screen.queryByTestId("children");
      expect(children).not.toBeNull();

      if (children) {
        fireEvent.click(children);
      }

      checkImage(1);

      goBackByArrowButton();

      checkImage(0);
    });

    test("back is not exist", () => {
      render(
        <ImageView album={items}>
          <div data-testid="children" />
        </ImageView>,
      );
      const children = screen.queryByTestId("children");
      expect(children).not.toBeNull();

      if (children) {
        fireEvent.click(children);
      }

      checkImage(0);

      goBackByArrowButton();

      checkImage(0);
    });
  });
});
