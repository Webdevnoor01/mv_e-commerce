import React from "react";
import { BrowserRouter } from "react-router-dom";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";

import { Toaster } from "react-hot-toast";

import store from "./store/index.js";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
      <Toaster
        toastOptions={{
          position: "top-right",
          duration: 3000,
        }}
      />
    </Provider>
  </BrowserRouter>
);
