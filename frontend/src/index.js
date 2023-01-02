import "./styles/index.css";

import App from "./App";
import { MainProvider } from "./contexts/MainContext";
import { ShoppingCartContextProvider } from "./contexts/ShoppingCartContext";
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
// @ts-ignore
const root = createRoot(container);
root.render(
  <MainProvider>
    <ShoppingCartContextProvider>
      <App />
    </ShoppingCartContextProvider>
  </MainProvider>
);
