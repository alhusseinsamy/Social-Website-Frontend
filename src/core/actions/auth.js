import api from "../networking/api";
import { Auth } from "./types";

// Load User
export const loadUser = () => async (dispatch) => {
  //   try {
  //     const res = await api.get("/users/me");
  //     dispatch({
  //       type: USER_LOADED,
  //       payload: res.data,
  //     });
  //   } catch (err) {
  //     dispatch({
  //       type: AUTH_ERROR,
  //     });
  //   }
};

// Register User
export const register = (formData) => async (dispatch) => {
  try {
    const body = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      age: formData.age,
    };
    const res = await api.post("/api/users/normal-user/", body);

    dispatch({
      type: Auth.REGISTER_SUCCESS,
      payload: {
        token: res.data.jwt,
        user: res.data.user,
      },
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: Auth.REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (username, password) => async (dispatch) => {
  const body = {
    username: username,
    password: password,
  };

  try {
    dispatch({
      type: Auth.LOGIN_LOADING,
    });

    const res = await api.post("/api/users/login/", body);

    dispatch({
      type: Auth.LOGIN_SUCCESS,
      payload: {
        token: res.data.token,
        userId: res.data.user_id,
        email: res.data.email,
        user: res.data.user,
      },
    });

    dispatch(loadUser());
  } catch (err) {
    throw err;
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: Auth.LOGOUT });
  dispatch({ type: "DESTROY_SESSION" });
};
