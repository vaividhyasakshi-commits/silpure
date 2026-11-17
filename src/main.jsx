import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { ProductProvider } from "./context/ProductContext.jsx";
import { ShopProvider } from "./context/ShopContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <ProductProvider>
      <ShopProvider>

        <App />

      </ShopProvider>
    </ProductProvider>

  </React.StrictMode>
);