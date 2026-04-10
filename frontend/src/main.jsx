import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.css";

import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ ADDED

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AppProvider>
      <ThemeProvider> {/* ✅ ADDED */}
        <App />
      </ThemeProvider>
    </AppProvider>
  </AuthProvider>
);