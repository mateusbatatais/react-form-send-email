import React from "react";
import { render } from "@testing-library/react";
import ModalDeleteConfirm from "./index";

describe("testes modal delete", () => {
  it("snapshot do botão", () => {
    const { container } = render(
      <ModalDeleteConfirm id={1} onDelete={() => ""} />
    );
    expect(container).toMatchSnapshot();
  });

  it("testa botão abrir", () => {});
});
