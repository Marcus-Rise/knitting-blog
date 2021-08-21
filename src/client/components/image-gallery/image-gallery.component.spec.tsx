import React from "react";
import { render, screen } from "@testing-library/react";
import { ImageGallery } from "./image-gallery.component";
import type { IImage } from "../image";

describe("ImageGallery", () => {
  test("render", () => {
    const items: IImage[] = [
      { src: "test_src", alt: "alt1" },
      { src: "test_src1", alt: "alt1" },
      { src: "test_src2", alt: "alt1" },
      { src: "test_src3", alt: "alt1" },
    ];

    render(<ImageGallery items={items} />);

    const screenItems = screen.getAllByRole("img");
    expect(screenItems).toHaveLength(items.length);
  });
});
