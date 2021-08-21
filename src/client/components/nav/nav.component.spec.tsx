import { fireEvent, render, screen } from "@testing-library/react";
import { Nav } from "./nav.component";
import React from "react";

jest.mock("./nav-item", () => ({
  __esModule: true,
  NavItem: jest.fn((props) => <>{props.title}</>),
}));
jest.mock("../overlay", () => ({
  __esModule: true,
  Overlay: jest.fn(() => <></>),
}));
jest.mock("../mobile-menu-button", () => ({
  __esModule: true,
  MobileMenuButton: jest.fn((props) => <button onClick={props.onClick} />),
}));
jest.mock("../mobile-menu-close-button", () => ({
  __esModule: true,
  MobileMenuCloseButton: jest.fn((props) => <button onClick={props.onClick} />),
}));

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

  test("mobile close on item click", () => {
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
    fireEvent.click(screen.getByRole("button"));
    const firstRender = asFragment();

    const byText = screen.getByText("Главная");
    fireEvent.click(byText);

    expect(firstRender).toMatchDiffSnapshot(asFragment());
  });
});
