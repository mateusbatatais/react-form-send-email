import React from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import "./App.scss";
import api from "./services/api";
import * as yup from "yup";
import { Formik } from "formik";
import MaskedInput from "react-maskedinput";
import selectData from "./data/orgaoEmissor.json";

function App() {
  const schema = yup.object().shape({
    rg: yup.string().required("O RG é obrigatório"),
    dataEmissao: yup.date().required("Preencha a data"),
    orgaoEmissor: yup.string().required("Escolha uma opção"),
  });
  interface FormValues {
    rg: string;
    dataEmissao: string;
    orgaoEmissor: string;
  }
  const sendForm = (values: FormValues) => {
    try {
      return api
        .post("/Contact", values)
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("ERRO");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Container>menu</Container>
      </header>
      <div>
        <Container>
          <h1>DADOS PESSOAIS</h1>
          <Formik
            validationSchema={schema}
            onSubmit={sendForm}
            initialValues={{
              rg: "",
              dataEmissao: "",
              orgaoEmissor: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              isValid,
              isSubmitting,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="rgCtrl">
                  <Form.Label>NÚMERO DO RG</Form.Label>
                  <Form.Control
                    type="text"
                    name="rg"
                    maxLength={15}
                    value={values.rg}
                    onChange={handleChange}
                    isValid={touched.rg && !errors.rg}
                    isInvalid={!!errors.rg}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rg}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="dataEmissaoCtrl">
                  <Form.Label>DATA DE EMISSÃO</Form.Label>
                  <Form.Control
                    type="text"
                    as={MaskedInput}
                    mask="11/11/1111"
                    name="dataEmissao"
                    value={values.dataEmissao}
                    onChange={handleChange}
                    isValid={touched.dataEmissao && !errors.dataEmissao}
                    isInvalid={!!errors.dataEmissao}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.dataEmissao}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="orgaoEmissor">
                  <Form.Label>ORGÃO EMISSOR</Form.Label>
                  <Form.Select
                    isValid={touched.orgaoEmissor && !errors.orgaoEmissor}
                    isInvalid={!!errors.orgaoEmissor}
                    onChange={handleChange}
                  >
                    {selectData.orgao_emissor.map((orgao, index) => (
                      <option key={index} value={orgao.value}>
                        {orgao.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.orgaoEmissor}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" disabled={!isValid || isSubmitting}>
                  CONTINUAR
                  {isSubmitting && (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </div>
  );
}

export default App;
