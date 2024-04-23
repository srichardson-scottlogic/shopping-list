import React from "react";
import ReactDOM from "react-dom/client";
import { bootstrap } from "safetest/react";
import App from "./App.tsx";
import "./index.css";

const container = document.getElementById("root")!;
const element = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const isDev = process.env.NODE_ENV !== "production";

bootstrap({
  element,
  render: (element) => ReactDOM.createRoot(container).render(element),

  // Add one of the following depending on your bundler...

  // Vite:
  importGlob: isDev && import.meta.glob("./**/*.safetest.{j,t}s{,x}"),

  // Other:
  // import: isDev && async (s) => import(`${s.replace(/.*src/, '.').replace(/\.safetest$/, '')}.safetest`),
});
