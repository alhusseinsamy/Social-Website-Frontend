import axios from "axios";
import { store } from "../../store";
import { Auth } from "../actions/types";

const api = axios.create({
  baseURL: "https://preventiatask.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(function (config) {
  let token = JSON.parse(localStorage.getItem("token"));
  if (token) config.headers.Authorization = `Token ${token}`.replace('"', "");

  return config;
});
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      store.dispatch({ type: Auth.LOGOUT });
    }
    var errorMessage = parseErrorMessage(err);
    return Promise.reject(errorMessage);
  }
);

function parseErrorMessage(err) {
  if (!err.response) {
    return `${err}`;
  }

  if (
    err.response &&
    err.response.data &&
    err.response.data.non_field_errors &&
    err.response.data.non_field_errors.length > 0
  ) {
    console.log("err => ", err.response.data.non_field_errors[0]);

    return err.response.data.non_field_errors[0];
  }

  var parsedErr;
  try {
    parsedErr = err?.response?.data[Object.keys(err?.response?.data)[0]];
  } catch (e) {
    console.log(e);
  }

  return parsedErr ?? "Unknown error occurred";
}

export default api;
