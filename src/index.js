import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import App from "./ui/screens/App";

import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";

import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
