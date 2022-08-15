import React, { useState } from "react";
import { Redirect, useParams } from "react-router";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { Hitman } from "global.d";

import { Layout } from "components/Layout";
import { useAuthContext } from "contexts/AuthContext";

import { DetailHitmanForm } from "./DetailHitmanForm";

const API_SERVER = process.env.REACT_APP_API_SERVER;

function DetailHitman() {
  const [hitmanData, setHitmanData] = useState<Partial<Hitman>>();
  const { id } = useParams<{ id: string }>();
  const { authState } = useAuthContext();
  const { accessToken } = authState;

  useQuery<Hitman>(
    "hitman",
    async () => {
      const { data } = await axios.get(`${API_SERVER}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return data;
    },
    {
      cacheTime: 0,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        setHitmanData(data);
      },
    }
  );

  const { mutate, isError, isSuccess } = useMutation(
    (data: Partial<Hitman>) => {
      return axios.put(`${API_SERVER}/users/${id}`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }
  );

  const onSubmit = (values: Partial<Hitman>) => {
    mutate(values);
  };

  if (!hitmanData) return <>"Loading..."</>;

  if (isSuccess) return <Redirect to="/hitmen" />;

  return (
    <Layout pageTitle="Edit Hitman">
      <DetailHitmanForm
        initialValues={hitmanData}
        onSubmit={onSubmit}
        hasError={isError}
      />
    </Layout>
  );
}

export { DetailHitman };
