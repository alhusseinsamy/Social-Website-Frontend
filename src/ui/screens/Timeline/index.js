import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation } from "react-router";
import {
  addPost,
  fetchMorePosts,
  fetchPosts,
} from "../../../core/actions/post";
import LastSeen from "../../../core/utils/LastSeen";
import * as Icon from "react-bootstrap-icons";

import "./index.css";
import { Buttons } from "../../shared/Button";
import { isArray, post } from "jquery";
import { Link } from "react-router-dom";

function Timeline({
  fetchPosts,
  fetchMorePosts,
  posts = [],
  isLoading,
  error,
  next,
  addPost,
  isAuthenticated,
}) {
  const history = useHistory();
  const location = useLocation();
  let searchParams = new URLSearchParams(location.search);
  const order = searchParams.get("orderBy");

  useEffect(() => {
    fetchPosts(order);
  }, [fetchPosts, order]);

  const goToPost = (id) => {
    let pathname = "/post/" + id;

    history.push({
      pathname: pathname,
    });
  };

  if (!isAuthenticated) {
    return (
      <section className="hero" style={{ marginTop: "100px" }}>
        <div className="jumbotron jumbotron-fluid mb-0">
          <div className="container">
            <div className="row justify-content-center text-center">
              <div className="col-md-10 col-lg-6">
                <h1 className="display-5">Social Platform</h1>

                <p className="lead">
                  This platform is for users to create and browse posts and
                  related data such as comments or likes.
                </p>

                <p className="lead">
                  <Link
                    to="/login"
                    className="btn btn-primary btn-lg"
                    role="button"
                  >
                    GET STARTED NOW
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="container mb-5">
      <div className="d-flex justify-content-center row">
        <div className="col-md-8">
          <div className="feed p-2">
            <AddPost fetchPosts={fetchPosts} addPost={addPost} />

            <SortPost />

            {posts !== null &&
              isArray(posts) &&
              posts.map((post, i) => (
                <PostCard
                  onClick={() => goToPost(post?.id)}
                  key={i}
                  username={post.normal_user.username}
                  title={post.title}
                  text={post.description}
                  image={post.image}
                  date={post.created_at}
                  likes={post.likes_count}
                />
              ))}

            {next ? (
              <div className="text-center">
                <button
                  onClick={() => fetchMorePosts(next)}
                  type="submit"
                  className="btn btn-light btn-block"
                  style={{ minWidth: "250px" }}
                >
                  {!isLoading ? (
                    "SEE MORE"
                  ) : (
                    <div
                      className="spinner-border"
                      role="status"
                      style={{ height: "17px", width: "17px" }}
                    >
                      <span className="sr-only"></span>
                    </div>
                  )}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function SortPost() {
  const location = useLocation();
  const history = useHistory();
  let searchParams = new URLSearchParams(location.search);

  const order = searchParams.get("orderBy");

  const removeQuery = (key) => {
    let pathname = location.pathname;
    searchParams.delete(key);

    history.push({
      pathname: pathname,
      search: searchParams.toString(),
    });
  };

  const addQuery = (key, value) => {
    let pathname = location.pathname;
    searchParams.set(key, value);

    history.push({
      pathname: pathname,
      search: searchParams.toString(),
    });
  };

  return (
    <div
      className="mt-2"
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <span
        onClick={() => addQuery("orderBy", "oldest")}
        className={order === "oldest" ? "feed-sort-selected" : "feed-sort"}
      >
        Oldest <Icon.SortUp />
      </span>
      <span
        onClick={() => removeQuery("orderBy")}
        className={order === null ? "feed-sort-selected" : "feed-sort"}
      >
        Newest <Icon.SortDown />
      </span>
    </div>
  );
}

function AddPost({ addPost, fetchPosts }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      setIsLoading(true);

      const file = e.target[2].files[0];

      await addPost(formData, file);
      document.getElementById("add-post-form").reset();

      fetchPosts();
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2 bg-white border">
      <div className="row" id="addcomment" style={{ marginInline: "5px" }}>
        <form
          id="add-post-form"
          style={{ padding: "10px" }}
          onSubmit={onSubmit}
        >
          {error ? (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
              style={{ marginBlockEnd: "10px" }}
            >
              {error}
            </div>
          ) : null}

          <div>
            <input
              type="text"
              className="form-control form-control-sm mb-2"
              id="title"
              name="title"
              placeholder="Post title"
              onChange={onChange}
              required
            />

            <textarea
              name="description"
              className="form-control mb-2"
              placeholder="What's on your mind?"
              onChange={onChange}
              required
            ></textarea>

            <input
              type="file"
              className="form-control-file"
              name="image"
              id="image"
              accept="image/png, image/gif, image/jpeg"
              required
            />
          </div>

          <Buttons.primary text="Submit" isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
}

function PostCard({
  username,
  title,
  text,
  image,
  date,
  likes,
  comments,
  onClick,
}) {
  return (
    <div
      className="bg-white border mt-2 grow"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <div
        className="border-bottom"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="d-flex flex-row justify-content-between align-items-center p-2">
          <div className="d-flex flex-row align-items-center feed-text px-2">
            <img
              className="rounded-circle"
              src="https://www.seekpng.com/png/detail/966-9665493_my-profile-icon-blank-profile-image-circle.png"
              alt=""
              width="45"
            />
            <div className="d-flex flex-column flex-wrap ml-2">
              <span className="font-weight-bold">{username}</span>
              <span className="text-black-50 time">
                <LastSeen date={date} />
              </span>
            </div>
          </div>
          <div className="feed-icon px-2">
            <i className="fa fa-ellipsis-v text-black-50"></i>
          </div>
        </div>
        <span style={{ marginInline: "7px" }}>
          <Icon.ChevronRight style={{ marginInline: "5px" }} />
        </span>
      </div>
      <div className="p-2 px-3">
        <h3>{title}</h3>
      </div>
      <div className="p-2 px-3">
        <span>{text}</span>
      </div>
      <div className="feed-image p-2 px-3">
        <img className="img-fluid img-responsive" src={image} alt="" />
      </div>
      <div className="d-flex justify-content-end socials p-2 py-3">
        <span style={{ marginInline: "7px" }}>
          <Icon.HandThumbsUp style={{ marginInline: "5px" }} />
          {likes ?? 0}
        </span>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPosts: (order) => dispatch(fetchPosts(order)),
    fetchMorePosts: (next) => dispatch(fetchMorePosts(next)),
    addPost: (formData, image) => dispatch(addPost(formData, image)),
  };
};

const mapStateToProps = (state, props) => ({
  next: state?.postReducer?.next,
  posts: state?.postReducer?.posts,
  isLoading: state?.postReducer?.isLoading,
  error: state?.postReducer?.error,
  isAuthenticated: state?.authReducer?.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
