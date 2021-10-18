import { Like } from "../actions/types";

const initialState = {
  isLoading: false,
  error: null,
};

function likeReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case Like.ADD_LIKE_SUCCESS:
      return { ...state, error: null, isLoading: false };
    case Like.ADD_LIKE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}

export default likeReducer;
