import { Like } from "./types";

import api from "../networking/api";
const base = "/api/social/like/";

export const addLike = (postId) => async (dispatch) => {
  try {
    const body = {
      post: postId,
    };

    const res = await api.post(`${base}`, body);

    dispatch({
      type: Like.ADD_LIKE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: Like.ADD_LIKE_FAIL, payload: err });

    throw err;
  }
};
