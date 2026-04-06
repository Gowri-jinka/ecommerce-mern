import React from "react";
import ReactDOM from "react-dom/client";   //react app into html
import App from "./App";
import "./styles/main.css";  

import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </AuthProvider>
);