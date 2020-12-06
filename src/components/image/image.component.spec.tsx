import React from "react";
import { render, screen } from "@testing-library/react";
import { Image } from "./image.component";

describe("Image", () => {
  test("render", () => {
    const alt = "alt test";
    const src = "example.com";
    const size = 320;
    render(<Image size={size} alt={alt} src={src} />);

    const image = screen.getByRole("img");

    expect(image.getAttribute("alt")).toEqual(alt);
    expect(image.getAttribute("src")).toEqual(src);
    expect(image.getAttribute("width")).toEqual("auto");
    expect(image.getAttribute("height")).toEqual(String(size));

    expect(screen.queryByText(alt)).not.toBeNull();
  });
});
