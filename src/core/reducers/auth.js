import { Auth } from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  user: JSON.parse(localStorage.getItem("user")),
  isAuthenticated: null,
  userId: null,
  email: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    // case USER_LOADED:
    //   return {
    //     ...state,
    //     isAuthenticated: true,
    //     loading: false,
    //     user: payload,
    //   };

    case Auth.REGISTER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: false,
        error: null,
      };
    case Auth.LOGIN_SUCCESS:
      localStorage.setItem("token", JSON.stringify(payload.token));
      localStorage.setItem("user", JSON.stringify(payload.user));

      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        error: null,
      };
    case Auth.LOGIN_FAIL:
    case Auth.REGISTER_FAIL:
    case Auth.LOGOUT:
      localStorage.removeItem("token");
      localStorage.clear();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
}

export default authReducer;
