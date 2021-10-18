import { Comment } from "./types";

import api from "../networking/api";
const base = "/api/social/comment/";

export const fetchComments = (postId) => async (dispatch) => {
  dispatch({ type: Comment.FETCH_COMMENTS_REQUEST });

  return api
    .get(base + "?post=" + postId)
    .then((res) => {
      dispatch({ type: Comment.FETCH_COMMENTS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: Comment.FETCH_COMMENTS_FAIL, payload: err });
    });
};

export const addComment = (postId, text) => async (dispatch) => {
  try {
    const body = {
      text: text,
      post: postId,
    };

    const res = await api.post(`${base}`, body);

    dispatch({
      type: Comment.ADD_COMMENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: Comment.ADD_COMMENT_FAIL, payload: err });
  }
};
