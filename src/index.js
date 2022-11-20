import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { ContextProvider } from "./contexts/MainContext";

const container = document.getElementById("root");
// @ts-ignore
const root = createRoot(container);
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
