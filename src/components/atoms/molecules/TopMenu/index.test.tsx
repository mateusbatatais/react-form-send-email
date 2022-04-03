import React from "react";
import { render } from "@testing-library/react";
import TopHeader from "./index";

describe("Testa top header", () => {
  it("snapshot", () => {
    const { container } = render(<TopHeader />);
    expect(container).toMatchSnapshot();
  });
});
