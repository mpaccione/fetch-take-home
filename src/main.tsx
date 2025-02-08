import { StrictMode } from "react";
import { HashRouter as Router } from "react-router";
import { createRoot } from "react-dom/client";

import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);
