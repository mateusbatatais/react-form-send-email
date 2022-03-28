import React from "react";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import "./App.scss";
import api from "./services/api";
import * as yup from "yup";
import { Formik } from "formik";

function App() {
  const schema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
  });

  interface FormValues {
    name: string;
  }
  const sendForm = (values: FormValues) => {
    try {
      return api
        .post("/Contact", values)
        .then((res) => console.log(res.status))
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
        <Container>base</Container>
      </header>
      <div>
        <Container>
          <Formik
            validationSchema={schema}
            onSubmit={sendForm}
            initialValues={{
              name: "",
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
                <Form.Group controlId="nameCtrl">
                  <Form.Label>RG</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="name"
                    value={values.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
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
