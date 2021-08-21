import { render } from "@testing-library/react";
import React from "react";
import { VerificationCodes } from "./verification-codes.component";

describe("VerificationCodes", () => {
  test("render", () => {
    const { asFragment } = render(
      <VerificationCodes googleCode={"google"} yandexCode={"yandex"} />,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
