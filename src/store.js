import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist"; // imports from redux-persist
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import reducers from "./core/reducers";

import thunk from "redux-thunk";
import api from "./core/networking/api";

const initialState = {};

const middleware = [thunk];

const persistConfig = {
  // configuration object for redux-persist
  key: "root",
  storage, // navigation will not be persisted
  // define which storage to use
};
const persistedReducer = persistReducer(persistConfig, reducers); // create a persisted reducer

const store = createStore(
  persistedReducer, // pass the persisted reducer instead of rootReducer to createStore
  initialState,
  // storeEnhancers(applyMiddleware(...middleware)),
  composeWithDevTools(applyMiddleware(...middleware))
);

let currentState = store.getState();
store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage and axios headers

  if (previousState.auth == null) {
    return;
  }

  if (previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});

const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Token ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
  }
};
export { store, persistor };
