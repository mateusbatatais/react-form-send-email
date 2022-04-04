import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("title", () => {
  render(<App />);
  const linkElement = screen.getByText("DADOS PESSOAIS");
  expect(linkElement).toBeInTheDocument();
});
