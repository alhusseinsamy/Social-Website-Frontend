import { Post } from "../actions/types";

const initialState = {
  posts: [],
  next: null,
  isLoading: true,
  error: null,

  post: null,
  postIsLoading: false,
  postError: null,
};

function postReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case Post.FETCH_POSTS_REQUEST:
      return { ...state, error: null, isLoading: true };
    case Post.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload.results,
        next: payload.next,
        total: payload.count,
        isLoading: false,
      };
    case Post.FETCH_POSTS_FAIL:
      return {
        ...state,
        posts: [],
        total: 0,
        error: payload,
        isLoading: false,
      };

    case Post.FETCH_MORE_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...payload.results],
        next: payload.next,
        total: payload.count,
        isLoading: false,
      };

    //single post

    case Post.FETCH_POST_SUCCESS:
      return {
        ...state,
        post: payload,
        postIsLoading: false,
        postError: null,
      };
    case Post.FETCH_POST_FAIL:
      return {
        ...state,
        post: null,
        error: payload,
        postIsLoading: false,
      };
    default:
      return state;
  }
}

export default postReducer;
