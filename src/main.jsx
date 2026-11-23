
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import { ProductProvider } from "./context/ProductContext.jsx";
import { ShopProvider } from "./context/ShopContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <ShopProvider>
          <App />
        </ShopProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);
