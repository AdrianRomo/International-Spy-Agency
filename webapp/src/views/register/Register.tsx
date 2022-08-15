import React from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { Formik, Form, FormikProps } from "formik";
import { Alert, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { string as yupString, object as yupObject } from "yup";

import { FormTextInput } from "components/FormTextInput";
import { Layout } from "components/Layout";

import { Hitman } from "global";

const API_SERVER = process.env.REACT_APP_API_SERVER;

const validation = yupObject().shape({
  first_name: yupString().required("First name required"),
  last_name: yupString().required("Last name required"),
  email: yupString()
    .required("Required email")
    .email("Insert a valid email"),
  password: yupString()
    .required("Required password")
    .min(8, "Password must be at least 8 characters")
    .matches(/\w/, "Password must contain at least one letter and one number"),
});

function Register() {
  const { mutate, isError, isSuccess } = useMutation(
    (data: Partial<Hitman>) => {
      return axios.post(`${API_SERVER}/users/`, data);
    }
  );

  const onSubmit = (values: Partial<Hitman>) => {
    mutate(values);
  };

  if (isSuccess) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout pageTitle="Sign Up">
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        }}
        validationSchema={validation}
        onSubmit={onSubmit}
        validateOnMount={true}
      >
        {({ isValid }: FormikProps<Partial<Hitman>>) => (
          <Form>
            <FormTextInput
              id="first_name"
              label="First Name"
              name="first_name"
              placeholder="First Name"
              type="text"
            />
            <FormTextInput
              id="last_name"
              label="Last Name"
              name="last_name"
              placeholder="Last Name"
              type="text"
            />
            <FormTextInput
              id="email"
              label="Email"
              name="email"
              placeholder="Email"
              type="text"
            />
            <FormTextInput
              id="password"
              type="password"
              label="Password"
              name="password"
              placeholder="Password"
            />
            {isError && <Alert variant="danger">Invalid Data</Alert>}
            <Button type="submit" disabled={!isValid}>
                Sign Up
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}

export { Register };
