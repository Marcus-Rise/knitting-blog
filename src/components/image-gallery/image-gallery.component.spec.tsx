import React from "react";
import { render, screen } from "@testing-library/react";
import { ImageGallery } from "./image-gallery.component";
import type { IImage } from "../image";

describe("ImageGallery", () => {
  test("render", () => {
    const items: IImage[] = [
      { src: "test_src", size: 300, alt: "alt1" },
      { src: "test_src1", size: 300, alt: "alt1" },
      { src: "test_src2", size: 300, alt: "alt1" },
      { src: "test_src3", size: 300, alt: "alt1" },
    ];

    render(<ImageGallery items={items} />);

    const screenItems = screen.getAllByRole("img");
    expect(screenItems).toHaveLength(items.length);
  });
});
