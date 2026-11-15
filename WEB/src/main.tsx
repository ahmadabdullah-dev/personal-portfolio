import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <App/>
      </QueryClientProvider>
  </StrictMode>,
);
