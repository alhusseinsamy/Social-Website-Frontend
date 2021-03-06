// Auth
export class Auth {
  static REGISTER_SUCCESS = "REGISTER_SUCCESS";
  static REGISTER_LOADING = "REGISTER_LOADING";
  static REGISTER_FAIL = "REGISTER_FAIL";
  static LOGIN_SUCCESS = "LOGIN_SUCCESS";
  static LOGIN_LOADING = "LOGIN_LOADING";
  static LOGIN_FAIL = "LOGIN_FAIL";
  static LOGOUT = "LOGOUT";
}

export class Post {
  static ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
  static ADD_POST_FAIL = "ADD_POST_FAIL";

  //posts
  static FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
  static FETCH_POSTS_FAIL = "FETCH_POSTS_FAIL";
  static FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
  static FETCH_MORE_POSTS_SUCCESS = "FETCH_MORE_POSTS_SUCCESS";
  static FETCH_MORE_POSTS_REQUEST = "FETCH_MORE_POSTS_REQUEST";
  static FETCH_MORE_POSTS_FAIL = "FETCH_MORE_POSTS_FAIL";

  // single post
  static FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
  static FETCH_POST_FAIL = "FETCH_POST_FAIL";
}

export class Comment {
  static ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
  static ADD_COMMENT_FAIL = "ADD_COMMENT_FAIL";

  static FETCH_COMMENTS_SUCCESS = "FETCH_COMMENTS_SUCCESS";
  static FETCH_COMMENTS_FAIL = "FETCH_COMMENTS_FAIL";
  static FETCH_COMMENTS_REQUEST = "FETCH_COMMENTS_REQUEST";
}

export class Like {
  static ADD_LIKE_SUCCESS = "ADD_LIKE_SUCCESS";
  static ADD_LIKE_FAIL = "ADD_LIKE_FAIL";
}
