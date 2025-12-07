import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import AuthProvider from "./context/AuthContext.tsx";
import { MyBooksProvider } from "./context/MyBooksContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <MyBooksProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MyBooksProvider>
    </AuthProvider>
  </React.StrictMode>
);