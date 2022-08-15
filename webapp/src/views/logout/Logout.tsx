import { Redirect } from "react-router";
import { useAuthContext } from "contexts/AuthContext";
import { useEffect } from "react";
import { Layout } from "components/Layout";
import { Spinner } from "react-bootstrap";

function Logout() {
  const { isAuthenticated, doLogout } = useAuthContext();

  useEffect(() => {
    doLogout();
  }, [doLogout]);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Layout pageTitle="Logging out">
      <Spinner animation="grow" variant="primary" />
    </Layout>
  );
}

export { Logout };
