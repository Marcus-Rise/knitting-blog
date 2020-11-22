import { fireEvent, render, screen } from "@testing-library/react";
import { Nav } from "./nav.component";
import React from "react";

describe("Nav", () => {
  test("items", () => {
    const { asFragment } = render(
      <Nav
        items={[
          {
            title: "Главная",
            link: "#",
          },
        ]}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test("mobile open on humburger click", () => {
    const { asFragment } = render(
      <Nav
        items={[
          {
            title: "Главная",
            link: "#",
          },
        ]}
      />,
    );
    const firstRender = asFragment();

    fireEvent.click(screen.getByRole("button"));

    expect(firstRender).toMatchDiffSnapshot(asFragment());
  });
});
