import React, { useState } from "react";
import { Redirect, useParams } from "react-router";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { Hit } from "global.d";

import { Layout } from "components/Layout";
import { useAuthContext } from "contexts/AuthContext";

import { DetailHitForm } from "./DetailHitForm";

const API_SERVER = process.env.REACT_APP_API_SERVER;

function DetailHit() {
  const [hitData, setHitData] = useState<Partial<Hit>>();
  const { id } = useParams<{ id: string }>();
  const { authState } = useAuthContext();
  const { accessToken } = authState;

  useQuery<Hit>(
    "hit",
    async () => {
      const { data } = await axios.get(`${API_SERVER}/hits/${id}`, {
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
        setHitData(data);
      },
    }
  );

  const { mutate, isError, isSuccess } = useMutation((data: Partial<Hit>) => {
    return axios.put(`${API_SERVER}/hits/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  });

  if (!hitData) return <>Loading</>;

  const onSubmit = (values: Partial<Hit>) => {
    mutate(values);
  };

  if (isSuccess) return <Redirect to="/hits" />;

  return (
    <Layout pageTitle="Edit target">
      <DetailHitForm
        initialValues={hitData}
        onSubmit={onSubmit}
        hasError={isError}
      />
    </Layout>
  );
}

export { DetailHit };
