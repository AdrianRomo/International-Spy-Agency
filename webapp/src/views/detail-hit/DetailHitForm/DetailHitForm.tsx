import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Alert, Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { string as yupString, object as yupObject } from "yup";
import { Formik, Form, FormikProps } from "formik";

import { FormTextInput } from "components/FormTextInput";
import { useAuthContext } from "contexts/AuthContext";
import { FormSelect, SelectOption } from "components/FormSelect";
import { Hit, Hitman, HitmanTypes, HitStateTypes } from "global.d";

const validation = yupObject().shape({
  target_name: yupString().required("Target name is required"),
  hitman_id: yupString().required("Hitman is required"),
  state: yupString().required("State is required"),
});

const API_SERVER = process.env.REACT_APP_API_SERVER;

interface DetailHitFormProps {
  initialValues: Partial<Hit>;
  hasError: boolean;
  onSubmit: (values: Partial<Hit>) => void;
}

function DetailHitForm({
  initialValues,
  hasError,
  onSubmit,
}: DetailHitFormProps) {
  const [hitmanOptions, setHitmanOptions] = useState<SelectOption[]>([]);
  const { authState } = useAuthContext();
  const { accessToken, hitman_type, id, email } = authState;
  const { state, hitman_id } = initialValues;

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

  const isOwner = useMemo(() => {
    return hitman_id === id;
  }, [hitman_id, id]);
  const isHitman = useMemo(() => {
    return [HitmanTypes.HITMAN].includes(hitman_type as HitmanTypes);
  }, [hitman_type]);
  const isClosed = useMemo(() => {
    return [HitStateTypes.COMPLETED, HitStateTypes.FAILED].includes(
      state as HitStateTypes
    );
  }, [state]);

  useEffect(() => {
    if (isOwner) {
      setHitmanOptions((prevState) => [
        { value: id, text: email } as SelectOption,
        ...prevState,
      ]);
    }
  }, [isOwner, setHitmanOptions, id, email]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validation}
      onSubmit={onSubmit}
      validateOnMount={true}
    >
      {({ isValid }: FormikProps<Partial<Hit>>) => {
        return (
          <Form>
            <FormTextInput
              id="target_name"
              label="Target Name"
              name="target_name"
              placeholder="Target Name"
              type="text"
              disabled={true}
            />
            <FormTextInput
              id="description"
              label="Description"
              name="description"
              placeholder="Description"
              type="text"
              as="textarea"
              disabled={true}
            />
            <FormSelect
              id="hitman_id"
              label="Hitman"
              name="hitman_id"
              placeholder="Select a hitman"
              options={hitmanOptions}
              disabled={isHitman || isClosed}
            />
            <FormSelect
              id="state"
              label="State"
              name="state"
              placeholder="Select a state of the hitman"
              options={[
                { value: HitStateTypes.IN_PROGRESS, text: "In Progress" },
                { value: HitStateTypes.COMPLETED, text: "Completed" },
                { value: HitStateTypes.FAILED, text: "Failed" },
              ]}
              disabled={!isOwner || isClosed}
            />
            {hasError && <Alert variant="danger">Invalid Data</Alert>}
            <Button type="submit" disabled={!isValid || isClosed}>
                Submit
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

export { DetailHitForm };
