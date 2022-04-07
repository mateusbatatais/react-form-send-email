import React, { useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import api from "../../../services/api";
import { FormValues } from "../../../interfaces/formValues";
import { Formik } from "formik";
import * as yup from "yup";
import { parse } from "date-fns";
import MaskedInput from "react-maskedinput";
import selectData from "../../../data/orgaoEmissor.json";

interface Props {
  item: FormValues;
  onEdit: () => void;
}

function ModalEdit({ item, onEdit }: Props) {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editItem = (values: FormValues) => {
    api.put(`/Contact/${item.id}`, values).then((response) => {
      handleClose();
      onEdit();
    });
  };

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

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Formik
          validationSchema={schema}
          validateOnBlur={false}
          onSubmit={editItem}
          initialValues={{
            id: item.id,
            rg: item.rg,
            dataEmissao: item.dataEmissao,
            orgaoEmissor: item.orgaoEmissor,
            sexo: item.sexo,
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
              <Modal.Header closeButton>
                <Modal.Title>Edição de dados</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group controlId="rgCtrl">
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
                <Form.Group controlId="dataEmissaoCtrl">
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
                <Form.Group controlId="orgaoEmissor">
                  <Form.Label>ORGÃO EMISSOR</Form.Label>
                  <Form.Select
                    isValid={touched.orgaoEmissor && !errors.orgaoEmissor}
                    isInvalid={!!errors.orgaoEmissor}
                    onChange={handleChange}
                  >
                    {selectData.orgao_emissor.map((orgao, index) => (
                      <option
                        key={index}
                        value={orgao.value}
                        selected={
                          orgao.value === item.orgaoEmissor ? true : false
                        }
                      >
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
                    className={`btn-custom mb-2 ${
                      values.sexo && values.sexo[0] === "Feminino"
                        ? "d-none"
                        : ""
                    } ${
                      values.sexo && values.sexo[0] === "Masculino"
                        ? "btn-selected"
                        : ""
                    }`}
                    isValid={touched.sexo && !errors.sexo}
                    label="Masculino"
                    name="sexo"
                    id="M"
                    type="checkbox"
                    value="Masculino"
                    onChange={handleChange}
                  />
                  <Form.Check
                    className={`btn-custom ${
                      values.sexo && values.sexo[0] === "Masculino"
                        ? "d-none"
                        : ""
                    } ${
                      values.sexo && values.sexo[0] === "Feminino"
                        ? "btn-selected"
                        : ""
                    }`}
                    isValid={touched.sexo && !errors.sexo}
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
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  disabled={!isValid || isSubmitting}
                  type="submit"
                >
                  Salvar
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
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
      <Button
        variant="primary"
        className="me-1 mb-1"
        size="sm"
        name="editar"
        onClick={handleShow}
      >
        Editar
      </Button>
    </>
  );
}

export default ModalEdit;
