import React, { useState } from "react";
import { Container, Form, Button, Spinner, Alert } from "react-bootstrap";
import api from "../../services/api";
import * as yup from "yup";
import { Formik } from "formik";
import MaskedInput from "react-maskedinput";
import selectData from "../../data/orgaoEmissor.json";
import { parse } from "date-fns";

function PersonaData() {
  const schema = yup.object().shape({
    rg: yup.string().required("O RG é obrigatório"),
    dataEmissao: yup
      .date()
      .transform((value, originalValue) =>
        parse(originalValue, "dd/MM/yyyy", new Date())
      )
      .required("Preencha a data")
      .typeError("A data está no formato inválido"),
    orgaoEmissor: yup.string().required("Escolha uma opção"),
    sexo: yup.array().test({
      name: "verifica sexo",
      exclusive: true,
      message: "Você precisa escolher seu sexo",
      test: (value: any) => value.length > 0,
    }),
  });
  interface FormValues {
    rg: string;
    dataEmissao: string;
    orgaoEmissor: string;
    sexo: string[];
  }
  const [status, setStatus] = useState("");
  const sendForm = (values: FormValues) => {
    try {
      return api
        .post("/Contact", values)
        .then((res) => {
          res.status >= 200 && res.status < 300
            ? setStatus("success")
            : setStatus("danger");
          console.log(res);
        })
        .catch((err) => {
          setStatus("danger");
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
          {status !== "" && (
            <Alert variant={status}>
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
          <h1>DADOS PESSOAIS</h1>
          <Formik
            validationSchema={schema}
            validateOnBlur={false}
            onSubmit={sendForm}
            initialValues={{
              rg: "",
              dataEmissao: "",
              orgaoEmissor: "",
              sexo: [],
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
                <Form.Group controlId="sexo">
                  <Form.Label>SEXO</Form.Label>
                  <Form.Check
                    className={
                      values.sexo && values.sexo[0] === "Feminino"
                        ? "d-none"
                        : ""
                    }
                    isValid={touched.sexo && !errors.sexo}
                    isInvalid={!!errors.sexo}
                    inline
                    label="Masculino"
                    name="sexo"
                    type="checkbox"
                    value="Masculino"
                    onChange={handleChange}
                  />
                  <Form.Check
                    className={
                      values.sexo && values.sexo[0] === "Masculino"
                        ? "d-none"
                        : ""
                    }
                    isValid={touched.sexo && !errors.sexo}
                    isInvalid={!!errors.sexo}
                    inline
                    label="Feminino"
                    name="sexo"
                    value="Feminino"
                    type="checkbox"
                    onChange={handleChange}
                  />
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

export default PersonaData;