import { render, fireEvent, screen } from "@testing-library/react";
import { ImageView } from "./image-view.component";
import React from "react";

jest.mock("../modal", () => ({
  __esModule: true,
  Modal: jest.fn((props) => <div data-testid={"modal"}>{props.children}</div>),
}));

describe("ImageView", () => {
  const items = [
    { src: "/src1", alt: "alt1" },
    { src: "/src2", alt: "alt2" },
    { src: "/src3", alt: "alt3" },
  ];
  const open = (id = "children"): void => {
    const children = screen.queryByTestId(id);
    expect(children).not.toBeNull();

    if (children) {
      fireEvent.click(children);
    }
  };
  const close = (): void => {
    const closeButton = screen.queryByText("X");
    expect(closeButton).not.toBeNull();

    if (closeButton) {
      fireEvent.click(closeButton);
    }
  };
  const checkImage = (index: number, isExist = true): void => {
    const image = items[index];
    const element = screen.queryByAltText(image.alt);

    if (isExist) {
      expect(element).not.toBeNull();
    } else {
      expect(element).toBeNull();
    }
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

  beforeAll(() => {
    expect(items).toHaveLength(3);
  });

  describe("close", () => {
    test("hide on close", () => {
      render(
        <ImageView album={items}>
          <div data-testid="children" />
        </ImageView>,
      );

      expect(screen.queryByTestId("modal")).toBeNull();

      open();

      expect(screen.queryByTestId("modal")).not.toBeNull();

      close();

      expect(screen.queryByTestId("modal")).toBeNull();
    });

    test("restore index on close", () => {
      render(
        <ImageView album={items}>
          <div data-testid="children" />
        </ImageView>,
      );
      open();

      checkImage(0);

      goNextByArrowButton();
      checkImage(0, false);
      checkImage(1);

      close();
      open();

      checkImage(1, false);
      checkImage(0);
    });
  });

  describe("navigation", () => {
    test("next by keyboard", () => {
      render(
        <ImageView album={items}>
          <div data-testid="children" />
        </ImageView>,
      );
      open();

      checkImage(0);

      goNextByKeyboard();
      checkImage(0, false);

      checkImage(1);
    });

    test("next by button", () => {
      render(
        <ImageView album={items}>
          <div data-testid="children" />
        </ImageView>,
      );
      open();

      checkImage(0);

      goNextByArrowButton();

      checkImage(0, false);

      checkImage(1);
    });

    test("next is not exist", () => {
      render(
        <ImageView album={items} currentIndex={2}>
          <div data-testid="children" />
        </ImageView>,
      );
      open();

      checkImage(2);

      expect(getNextButton()).toBeNull();
      goNextByKeyboard();

      checkImage(2);

      goNextByArrowButton();

      checkImage(2);
    });

    test("back by keyboard", () => {
      render(
        <ImageView album={items} currentIndex={2}>
          <div data-testid="children" />
        </ImageView>,
      );
      open();

      checkImage(2);

      goBackByKeyboard();

      checkImage(1);
    });

    test("back by button", () => {
      render(
        <ImageView album={items} currentIndex={2}>
          <div data-testid="children" />
        </ImageView>,
      );
      open();

      checkImage(2);

      goBackByArrowButton();

      checkImage(1);
    });

    test("back is not exist", () => {
      render(
        <ImageView album={items}>
          <div data-testid="children" />
        </ImageView>,
      );
      open();

      checkImage(0);

      expect(getBackButton()).toBeNull();
      goBackByArrowButton();

      checkImage(0);

      goBackByKeyboard();

      checkImage(0);
    });
  });

  test("unique event", () => {
    render(
      <>
        <ImageView album={items} currentIndex={0}>
          <div data-testid="children0" />
        </ImageView>
        <ImageView album={items} currentIndex={1}>
          <div data-testid="children1" />
        </ImageView>
        <ImageView album={items} currentIndex={2}>
          <div data-testid="children2" />
        </ImageView>
      </>,
    );
    open("children0");

    checkImage(0);

    goNextByKeyboard();
    goNextByKeyboard();

    checkImage(0, false);
    checkImage(1, false);
    checkImage(2);

    close();

    open("children1");

    checkImage(2, false);
    checkImage(1);

    close();

    open("children2");

    checkImage(2);
  });
});
