import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import api from "../../services/api";
import * as yup from "yup";
import { Formik } from "formik";
import MaskedInput from "react-maskedinput";
import selectData from "../../data/orgaoEmissor.json";
import { parse } from "date-fns";
import { FormValues } from "../../interfaces/formValues";
import styles from "./style.module.scss";

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

  const [status, setStatus] = useState("");
  const sendForm = (values: FormValues) => {
    try {
      return api
        .post("/Contact", values)
        .then((res) => {
          res.status >= 200 && res.status < 300
            ? setStatus("success")
            : setStatus("danger");
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
      <div className={`pt-3 text-light-custom ${styles.bgSoftBlack}`}>
        <Container>
          <Row>
            <Col className="pb-3" md={3}>
              <small className="text-blue">me chamo</small>
              <h5>Paul Irish</h5>
              <small>
                <span className="text-blue">CPF</span> 130.212.150-41
              </small>
            </Col>
            <Col className="pb-3" md={3}>
              <small className="text-blue">preciso de</small>
              <h5>R$ 2.000</h5>
            </Col>
            <Col className="pb-3" md={3}>
              <small className="text-blue">quero pagar em</small>
              <h5>12 vezes</h5>
            </Col>
            <Col className="pb-3" md={3}>
              <small className="text-blue">para</small>
              <h5>Comprar uma bike</h5>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`mb-5 fw-bold ${styles.bgSoftGray}`}>
        <Container>
          <Row>
            <Col className="py-2 d-flex align-items-center opacity-25" md={3}>
              <div
                className={`${styles.customCircle} flex-shrink-0 me-2 py-1 rounded-circle text-white d-flex align-items-center justify-content-center ${styles.bgSoftBlack}`}
              >
                1
              </div>
              <div>SIMULE</div>
            </Col>
            <Col className="py-2 d-flex align-items-center" md={3}>
              <div
                className={`${styles.customCircle} flex-shrink-0  me-2 py-1 rounded-circle text-blue d-flex align-items-center justify-content-center ${styles.bgSoftBlack}`}
              >
                2
              </div>
              <div>PREENCHA O CADASTRO</div>
            </Col>
            <Col className="py-2 d-flex align-items-center opacity-25" md={3}>
              <div
                className={`${styles.customCircle} flex-shrink-0  me-2 py-1 rounded-circle text-black border border-3 border-dark d-flex align-items-center justify-content-center`}
              >
                3
              </div>
              <div>REVISE SEU PEDIDO</div>
            </Col>
            <Col className="py-2 d-flex align-items-center opacity-25" md={3}>
              <div
                className={`${styles.customCircle} flex-shrink-0  me-2 py-1 rounded-circle text-black border border-3 border-dark d-flex align-items-center justify-content-center`}
              >
                3
              </div>
              <div>REALIZE O PEDIDO</div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="pb-5 w-75">
        {status !== "" && (
          <Alert variant={status} className="mt-3">
            {status === "success"
              ? "Cadastro realizado com sucesso"
              : "Algo não ocorreu como esperado. Tente novamente mais tarde"}
            <hr />
          </Alert>
        )}
        <h2 className="py-5 text-center fw-bold">DADOS PESSOAIS</h2>
        <Formik
          validationSchema={schema}
          validateOnBlur={false}
          onSubmit={sendForm}
          initialValues={{
            id: 0,
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
              <Row className="ahifen">
                <Form.Group
                  controlId="rgCtrl"
                  as={Col}
                  sm={4}
                  className="px-1 my-1"
                >
                  <Form.Label>NÚMERO DO RG</Form.Label>
                  <Form.Control
                    type="text"
                    name="rg"
                    as={MaskedInput}
                    mask="11 111 111"
                    placeholder=""
                    value={values.rg}
                    onChange={handleChange}
                    isValid={touched.rg && !errors.rg}
                    isInvalid={!!errors.rg}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.rg}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group
                  controlId="dataEmissaoCtrl"
                  as={Col}
                  sm={4}
                  className="px-1 my-1"
                >
                  <Form.Label>DATA DE EMISSÃO</Form.Label>
                  <Form.Control
                    type="text"
                    as={MaskedInput}
                    mask="11/11/1111"
                    placeholder=""
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
                <Form.Group
                  controlId="orgaoEmissor"
                  as={Col}
                  sm={4}
                  className="px-1 my-1"
                >
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
              </Row>
              <Row>
                <Form.Group
                  controlId="sexo"
                  className={`${styles.grpSexo} my-3 px-1`}
                >
                  <Form.Label className="me-2">SEXO</Form.Label>
                  <Form.Check
                    className={`btn-custom ${
                      values.sexo && values.sexo[0] === "Feminino"
                        ? "d-none"
                        : ""
                    } ${
                      values.sexo && values.sexo[0] === "Masculino"
                        ? "btn-selected"
                        : ""
                    }`}
                    isValid={touched.sexo && !errors.sexo}
                    inline
                    label="Masculino"
                    name="sexo"
                    id="M"
                    type="checkbox"
                    value="Masculino"
                    onChange={handleChange}
                  />
                  <Form.Check
                    className={` btn-custom ${
                      values.sexo && values.sexo[0] === "Masculino"
                        ? "d-none"
                        : ""
                    } ${
                      values.sexo && values.sexo[0] === "Feminino"
                        ? "btn-selected"
                        : ""
                    } ${styles.selectF}`}
                    isValid={touched.sexo && !errors.sexo}
                    inline
                    label="Feminino"
                    name="sexo"
                    id="F"
                    value="Feminino"
                    type="checkbox"
                    onChange={handleChange}
                  />
                  <div
                    className={`invalid-feedback ${
                      !!errors.sexo ? "d-flex" : ""
                    }`}
                  >
                    {errors.sexo}
                  </div>
                </Form.Group>
              </Row>
              <Row className="justify-content-center px-1">
                <Button
                  className="btn-confirm"
                  type="submit"
                  disabled={!isValid || isSubmitting}
                >
                  CONTINUAR
                  {isSubmitting ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="ms-2">▸</span>
                  )}
                </Button>
              </Row>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
}

export default PersonaData;
