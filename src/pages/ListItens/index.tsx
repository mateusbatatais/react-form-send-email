import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import api from "../../services/api";
import { FormValues } from "../../interfaces/formValues";

function ListItens() {
  const [data, setData] = useState<FormValues[]>([]);
  const listItens = () => {
    api.get("/Contact").then((response) => setData(response.data));
  };

  useEffect(() => {
    listItens();
  }, []);

  return (
    <Container>
      <Table striped bordered hover>
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
          {data &&
            data.map((item: FormValues, index: number) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{item.rg}</td>
                <td>{item.dataEmissao}</td>
                <td>{item.orgaoEmissor}</td>
                <td>{item.sexo}</td>
                <td></td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListItens;
