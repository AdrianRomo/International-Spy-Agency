import React, { useEffect, useState } from "react";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { string as yupString, object as yupObject, bool as yupBool } from "yup";
import { Formik, Form, FormikProps } from "formik";

import { FormTextInput } from "components/FormTextInput";
import { useAuthContext } from "contexts/AuthContext";
import { FormSelect, SelectOption } from "components/FormSelect";
import { Hitman, HitmanTypes } from "global.d";

const validation = yupObject().shape({
  first_name: yupString().required("First name required"),
  last_name: yupString().required("Last name required"),
  email: yupString()
    .required("Required email")
    .email("Insert a valid email"),
  manager_id: yupString().required("Manager required"),
  hitman_type: yupString().required("Hitman type required"),
  is_active: yupBool().required("Is active required"),
});

const API_SERVER = process.env.REACT_APP_API_SERVER;

interface DetailHitmanFormProps {
  initialValues: Partial<Hitman>;
  hasError: boolean;
  onSubmit: (values: Partial<Hitman>) => void;
}

function DetailHitmanForm({
  initialValues,
  hasError,
  onSubmit,
}: DetailHitmanFormProps) {
  const [hitmanOptions, setHitmanOptions] = useState<SelectOption[]>([]);
  const { authState } = useAuthContext();
  const { accessToken, id, email } = authState;

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

        setHitmanOptions((prevState) => [...prevState, ...options]);
      },
    }
  );

  useEffect(() => {
    setHitmanOptions((prevState) => [
      { value: id, text: email } as SelectOption,
      ...prevState,
    ]);
  }, [setHitmanOptions, id, email]);

  if (!hitmanOptions) return <>"Loading..."</>;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={onSubmit}
    >
      {({ isValid }: FormikProps<Partial<Hitman>>) => (
        <Form>
          <FormTextInput
            id="first_name"
            label="First name"
            name="first_name"
            placeholder="First name"
            type="text"
          />
          <FormTextInput
            id="last_name"
            label="Last name"
            name="last_name"
            placeholder="Last name"
            type="text"
          />
          <FormTextInput
            id="email"
            label="Email"
            name="email"
            placeholder="Email"
            type="text"
          />
          <FormSelect
            id="manager_id"
            label="Manager"
            name="manager_id"
            placeholder="Select a hitman"
            options={hitmanOptions}
          />
          <FormSelect
            id="is_active"
            label="Is active"
            name="is_active"
            placeholder="Select a hitman status"
            options={[
              { value: false, text: "Inactivo" },
              { value: true, text: "Activo" },
            ]}
          />
          <FormSelect
            id="hitman_type"
            label="Tipo"
            name="hitman_type"
            placeholder="Select a hitman type"
            options={[
              // { value: HitmanTypes.BOSS, text: "Jefe" },
              { value: HitmanTypes.MANAGER, text: "Manager" },
              { value: HitmanTypes.HITMAN, text: "Hitman" },
            ]}
          />
          {hasError && <Alert variant="danger">Invalid Data</Alert>}
          <Button type="submit" disabled={!isValid}>
            Update
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export { DetailHitmanForm };
