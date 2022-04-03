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
import ModalDeleteConfirm from "../../components/organism/ModalDeleteConfirm";
import ModalEdit from "../../components/organism/ModalEdit";

function ListItens() {
  const [status, setStatus] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  const [data, setData] = useState<FormValues[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const listItens = () => {
    api.get("/Contact").then((response) => {
      setLoading(false);
      setData(response.data);
    });
  };

  const onDelete = () => {
    setStatus("success");
    setFeedbackMsg("Campo excluido com sucesso!");
    listItens();
  };

  const onEdit = () => {
    setStatus("success");
    setFeedbackMsg("Dados alterados com sucesso!");
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
            {feedbackMsg}
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
                    <ModalEdit item={item} onEdit={onEdit} />
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
    </>
  );
}

export default ListItens;
