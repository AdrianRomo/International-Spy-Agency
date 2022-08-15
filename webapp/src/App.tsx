import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

import Router from "views/Router";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <React.StrictMode>
          <Router />
        </React.StrictMode>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export { App };
