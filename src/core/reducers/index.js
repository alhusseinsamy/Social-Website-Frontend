import { combineReducers } from "redux";
import authReducer from "./auth";
import postReducer from "./post";
import commentReducer from "./comment";
import likeReducer from "./like";

// Combine all reducers.
const appReducer = combineReducers({
  authReducer,
  postReducer,
  commentReducer,
  likeReducer,
});

const rootReducer = (state, action) => {
  // Clear all data in redux store to initial.
  if (action.type === "DESTROY_SESSION") {
    state = undefined;
    localStorage.clear();
  }
  return appReducer(state, action);
};
export default rootReducer;
