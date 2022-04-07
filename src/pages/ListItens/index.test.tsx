import React from "react";
import { render, screen } from "@testing-library/react";
import List from "./index";

describe("Testa listagem de itens", () => {
  it("verifica rg cabeçalho", () => {
    render(<List />);
    const rg = screen.getByText(/número do rg/i);
    expect(rg).toBeInTheDocument();
  });
  it("verifica data cabeçalho", () => {
    render(<List />);
    const d = screen.getByText(/data de emissão/i);
    expect(d).toBeInTheDocument();
  });
  it("verifica orgão cabeçalho", () => {
    render(<List />);
    const o = screen.getByText(/orgão emisso/i);
    expect(o).toBeInTheDocument();
  });
  it("verifica sexo cabeçalho", () => {
    render(<List />);
    const s = screen.getByText(/sexo/i);
    expect(s).toBeInTheDocument();
  });
});
