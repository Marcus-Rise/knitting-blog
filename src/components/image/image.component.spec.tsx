import React from "react";
import { render, screen } from "@testing-library/react";
import { Image } from "./image.component";

describe("Image", () => {
  test("render", () => {
    const alt = "alt test";
    const src = "example.com";
    render(<Image alt={alt} src={src} />);

    const image = screen.getByRole("img");

    expect(image.getAttribute("alt")).toEqual(alt);
    expect(image.getAttribute("src")).toEqual(src);
    expect(image.getAttribute("height")).toEqual(320);
    expect(image.getAttribute("width")).toEqual(200);

    expect(screen.queryByText(alt)).not.toBeNull();
  });
});
