import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import "./App.scss";
import api from "./services/api";
import * as yup from "yup";
import { Formik } from "formik";

function App() {
  const [data, setData] = useState<string[]>([]);

  const schema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
  });

  // const handleSubmit = () => {
  //   console.log(formValues);
  //   api
  //     .get("/Contact")
  //     .then((res) => setData(res.data))
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  return (
    <div className="App">
      <header className="App-header">
        <Container>base</Container>
      </header>
      <div>
        <Container>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => {
              console.log(values);
            }}
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
              dirty,
              isValid,
            }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="nameCtrl">
                  <Form.Label>Nome</Form.Label>
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
                <Button type="submit" disabled={!(dirty && isValid)}>
                  Submit form
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
