import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // Assuming Tailwind directives might be here or injected via HTML script

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}