import React from "react";
import { render, screen } from "@testing-library/react";
import ModalEdit from "./index";

const mock = {
  id: 1,
  rg: "string",
  dataEmissao: "string",
  orgaoEmissor: "string",
  sexo: ["m"],
};

describe("testes modal editar", () => {
  it("exibe botão deletar", () => {
    render(<ModalEdit item={mock} onEdit={() => ""} />);
    const bt = screen.getByRole("button", { name: /editar/i });
    expect(bt).toBeInTheDocument();
  });
});
