import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.css";
import registerServiceWorker from "./registerServiceWorker";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
registerServiceWorker();
