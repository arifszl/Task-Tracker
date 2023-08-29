import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

import { configureStore } from "@reduxjs/toolkit";

import { Provider } from "react-redux";

import taskReducer from "./store/Store";

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);
