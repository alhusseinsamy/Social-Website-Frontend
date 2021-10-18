import { Comment } from "../actions/types";

const initialState = {
  comments: [],
  isLoading: true,
  error: null,
};

function commentReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case Comment.FETCH_COMMENTS_REQUEST:
      return { ...state, error: null, isLoading: true };
    case Comment.FETCH_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: payload,
        error: null,
        isLoading: false,
      };
    case Comment.FETCH_COMMENTS_FAIL:
      return {
        ...state,
        comments: [],
        error: payload,
        isLoading: false,
      };

    default:
      return state;
  }
}

export default commentReducer;
