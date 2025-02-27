import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import QueryProvider from "./lib/react-query/QueryProvider.tsx";
import {BrowserRouter as Router} from "react-router-dom"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <QueryProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </QueryProvider>
    </Router>
  </StrictMode>
);
