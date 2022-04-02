import React, { useEffect, useState } from "react";
import { Container, Spinner, Table, Button, Modal } from "react-bootstrap";
import api from "../../services/api";
import { FormValues } from "../../interfaces/formValues";

function ListItens() {
  const [data, setData] = useState<FormValues[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [showE, setShowE] = useState<boolean>(false);
  const handleCloseE = () => setShowE(false);
  const handleShowE = () => setShowE(true);

  const [showX, setShowX] = useState<boolean>(false);
  const handleCloseX = () => setShowX(false);
  const handleShowX = () => setShowX(true);

  const listItens = () => {
    api.get("/Contact").then((response) => {
      setLoading(false);
      setData(response.data);
    });
  };

  useEffect(() => {
    listItens();
  }, []);

  return (
    <>
      <Container>
        <Table className="mt-5" striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>NÚMERO DO RG</th>
              <th>DATA DE EMISSÃO</th>
              <th>ORGÃO EMISSOR</th>
              <th>SEXO</th>
              <th>AÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="my-3" colSpan={6}>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                </td>
              </tr>
            ) : data && data.length ? (
              data.map((item: FormValues, index: number) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{item.rg}</td>
                  <td>{item.dataEmissao}</td>
                  <td>{item.orgaoEmissor}</td>
                  <td>{item.sexo}</td>
                  <td>
                    {" "}
                    <Button
                      variant="primary"
                      className="me-1 mb-1"
                      size="sm"
                      onClick={handleShowE}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      className="me-1 mb-1"
                      size="sm"
                      onClick={handleShowX}
                    >
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="my-3" colSpan={6}>
                  Nada a exibir
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Container>

      <Modal show={showE} onHide={handleCloseE}>
        <Modal.Header closeButton>
          <Modal.Title>Edição de dados</Modal.Title>
        </Modal.Header>
        <Modal.Body>Campos</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseE}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCloseE}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showX} onHide={handleCloseX}>
        <Modal.Header closeButton>
          <Modal.Title>Confirma exclusão?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Cuidado, essa ação não tem volta! Podemos excluir?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseX}>
            Voltar
          </Button>
          <Button variant="danger" onClick={handleCloseX}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ListItens;
