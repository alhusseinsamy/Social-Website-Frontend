import { Post } from "./types";

import api from "../networking/api";
const base = "/api/social/post/";

export const fetchPosts = (order) => async (dispatch) => {
  dispatch({ type: Post.FETCH_POSTS_REQUEST });

  var url = base;
  if (order !== "oldest") {
    url += "?ordering=-created_at";
  } else {
    url += "?ordering=created_at";
  }

  return api
    .get(url)
    .then((res) => {
      dispatch({ type: Post.FETCH_POSTS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: Post.FETCH_POSTS_FAIL, payload: err });
    });
};

export const fetchMorePosts = (next, order) => async (dispatch) => {
  const regex = /page=([^&]*)/i;
  const found = next.match(regex);
  const page = found[0];

  dispatch({ type: Post.FETCH_MORE_POSTS_REQUEST });

  var url = base;
  if (order !== "oldest") {
    url += "?ordering=created_at";
  } else {
    url += "?ordering=-created_at";
  }

  return api
    .get(url + "&" + page)
    .then((res) => {
      dispatch({ type: Post.FETCH_MORE_POSTS_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: Post.FETCH_MORE_POSTS_FAIL, payload: err });
    });
};

export const fetchPostById = (postId) => async (dispatch) => {
  try {
    const res = await api.get(`${base}${postId}`);

    dispatch({
      type: Post.FETCH_POST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: Post.FETCH_POST_FAIL, payload: err });
  }
};

export const addPost = (data, image) => async (dispatch) => {
  try {
    console.log(data);
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", image);

    const res = await api.post(`${base}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch({
      type: Post.ADD_POST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: Post.ADD_POST_FAIL, payload: err });

    throw err;
  }
};
