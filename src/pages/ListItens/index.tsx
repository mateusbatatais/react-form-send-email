import React, { useEffect, useState } from "react";
import {
  Container,
  Spinner,
  Table,
  Button,
  Modal,
  Alert,
} from "react-bootstrap";
import api from "../../services/api";
import { FormValues } from "../../interfaces/formValues";
import ModalDeleteConfirm from "../../components/atoms/molecules/ModalDeleteConfirm";

function ListItens() {
  const [status, setStatus] = useState("");

  const [data, setData] = useState<FormValues[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [showE, setShowE] = useState<boolean>(false);
  const handleCloseE = () => setShowE(false);
  const handleShowE = () => setShowE(true);

  const listItens = () => {
    api.get("/Contact").then((response) => {
      setLoading(false);
      setData(response.data);
    });
  };

  const onDelete = () => {
    console.log("deletou");
    setStatus("success");
    listItens();
  };

  useEffect(() => {
    listItens();
  }, []);

  return (
    <>
      <Container>
        {status !== "" && (
          <Alert variant={status} className="mt-3">
            <Alert.Heading>
              {status === "success" ? "Perfeito!" : "Aconteceu um erro"}
            </Alert.Heading>
            <p>
              {status === "success"
                ? "Seu formulário foi enviado com sucesso"
                : "Algo não ocorreu como esperado. Tente novamente mais tarde"}
            </p>
            <hr />
          </Alert>
        )}

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
                    <ModalDeleteConfirm id={item.id} onDelete={onDelete} />
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
    </>
  );
}

export default ListItens;
