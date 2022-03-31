import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import api from "../../services/api";
interface FormValues {
  rg: string;
  dataEmissao: string;
  orgaoEmissor: string;
  sexo: string[];
}

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
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListItens;
