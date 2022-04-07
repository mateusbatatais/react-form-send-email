import React from "react";
import { render, screen } from "@testing-library/react";
import ModalEdit from "./index";

describe("testes modal deletar", () => {
  it("exibe botão deletar", () => {
    render(<ModalEdit id={1} onDelete={() => ""} />);
    const bt = screen.getByRole("button", { name: /excluir/i });
    expect(bt).toBeInTheDocument();
  });
});
