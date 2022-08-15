import React, { useState } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import { Formik, Form, FormikHelpers } from "formik";
import { Alert, Button } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { string as yupString, object as yupObject } from "yup";

import { FormTextInput } from "components/FormTextInput";
import { Layout } from "components/Layout";
import { Hit, Hitman } from "global.d";

import { useAuthContext } from "contexts/AuthContext";
import { FormSelect, SelectOption } from "components/FormSelect";

const API_SERVER = process.env.REACT_APP_API_SERVER;

const validation = yupObject().shape({
  target_name: yupString().required("Target name required"),
  description: yupString().required("Description required"),
  hitman_id: yupString().required("Hitman required"),
});

function CreateHit() {
  const [hitmanOptions, setHitmanOptions] = useState<SelectOption[]>([]);
  const { authState } = useAuthContext();
  const { accessToken } = authState;

  useQuery<Hitman[]>(
    "my-hitmen",
    async () => {
      const { data } = await axios.get(`${API_SERVER}/me/hitmen`, {
        params: {
          is_active: true,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
    {
      initialData: [],
      refetchInterval: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const options = data.map(({ id, email }) => ({
          value: id,
          text: email,
        }));

        setHitmanOptions(options);
      },
    }
  );

  const { mutate, isError, isSuccess } = useMutation((data: Partial<Hit>) => {
    return axios.post(`${API_SERVER}/hits/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });

  const onSubmit = (
    values: Partial<Hit>,
    helpers: FormikHelpers<Partial<Hit>>
  ) => {
    mutate(values, {
      onError: () => {
        helpers.setSubmitting(false);
      },
    });
  };

  if (isSuccess) {
    return <Redirect to="/hits" />;
  }

  return (
    <Layout pageTitle="Create Target">
      <Formik
        initialValues={{
          target_name: "",
          hitman_id: "",
          description: "",
        }}
        validationSchema={validation}
        onSubmit={onSubmit}
      >
        <Form>
          <FormTextInput
            id="target_name"
            label="Target name"
            name="target_name"
            placeholder="Name"
            type="text"
          />
          <FormTextInput
            id="description"
            label="Description"
            name="description"
            placeholder="Name"
            type="text"
            as="textarea"
          />
          <FormSelect
            id="hitman_id"
            label="Hitman"
            name="hitman_id"
            placeholder="Select a hitman"
            options={hitmanOptions}
          />
          {isError && <Alert variant="danger">Invalid Data</Alert>}
          <Button type="submit">Create Target</Button>
        </Form>
      </Formik>
    </Layout>
  );
}

export { CreateHit };
