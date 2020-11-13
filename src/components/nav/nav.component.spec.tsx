import { render } from "@testing-library/react";
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
});
