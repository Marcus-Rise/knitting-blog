import { render } from "@testing-library/react";
import { Header } from "./header.component";
import React from "react";

jest.mock("../nav", () => ({
  __esModule: true,
  Nav: jest.fn(() => <nav />),
}));

describe("Header", () => {
  test("render", () => {
    const { asFragment } = render(
      <Header title={"title"} logoSrc={"http://test.com"} links={[{ title: "RRR", link: "#" }]} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
