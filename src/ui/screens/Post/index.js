import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchPostById } from "../../../core/actions/post";
import LastSeen from "../../../core/utils/LastSeen";
import * as Icon from "react-bootstrap-icons";
import { connect } from "react-redux";
import { addComment, fetchComments } from "../../../core/actions/comment";
import { Buttons } from "../../shared/Button";
import LikePost from "./LikePost";

function Post({
  fetchPostById,
  fetchComments,
  addComment,
  comments = [],
  post,
  isLoading,
  error,
}) {
  let { id } = useParams();

  useEffect(() => {
    fetchPostById(id);
    fetchComments(id);
  }, [fetchComments, fetchPostById, id]);

  return (
    <div className="container mb-5 ">
      <div className="d-flex justify-content-center row">
        <div className="col-md-8">
          {!isLoading && post != null ? (
            <PostCard post={post} fetchPostById={fetchPostById} />
          ) : null}

          <CommentSection
            id={id}
            comments={comments}
            addComment={addComment}
            fetchComments={fetchComments}
          />
        </div>
      </div>
    </div>
  );
}

function PostCard({ post, fetchPostById }) {
  return (
    <div className="bg-white border mt-2">
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
              <span className="font-weight-bold">
                {post.normal_user.username}
              </span>
              <span className="text-black-50 time">
                <LastSeen date={post.created_at} />
              </span>
            </div>
          </div>
          <div className="feed-icon px-2">
            <i className="fa fa-ellipsis-v text-black-50"></i>
          </div>
        </div>
      </div>
      <div className="p-2 px-3">
        <h3>{post.title}</h3>
      </div>
      <div className="p-2 px-3">
        <span>{post.description}</span>
      </div>
      <div className="feed-image p-2 px-3">
        <img className="img-fluid img-responsive" src={post.image} alt="" />
      </div>
      <div className="d-flex justify-content-end socials p-2 py-3">
        <span style={{ marginInline: "7px" }}>
          <LikePost
            id={post?.id}
            likes={post?.likes_count ?? 0}
            fetchPostById={fetchPostById}
          />
        </span>

        {/* <span style={{ marginInline: "10px" }}>
            <Icon.ChatLeft style={{ marginInline: "5px" }} />
            12
          </span> */}
      </div>
    </div>
  );
}

function CommentSection({ id, comments = [], addComment, fetchComments }) {
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onChange = (e) => setText(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      setIsLoading(true);
      await addComment(id, text);

      setText("");

      fetchComments(id);
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border mt-2">
      <div className="row">
        <h2 className="p-4">{comments.length} Comments</h2>
      </div>
      <div className="row" id="addcomment" style={{ marginInline: "5px" }}>
        <form onSubmit={onSubmit}>
          <textarea
            name="text"
            className="form-control"
            placeholder="Add comment..."
            onChange={onChange}
            value={text}
            required
          ></textarea>

          <Buttons.primary text="Submit" isLoading={isLoading} />
        </form>
      </div>
      <hr />
      <div style={{ marginInline: "20px" }}>
        {comments !== null &&
          comments.map((comment, i) => <CommentCard comment={comment} />)}
      </div>
    </div>
  );
}

function CommentCard({ comment }) {
  return (
    <div className="row comment">
      <div className="head">
        <small>
          <strong className="user">{comment.normal_user.username}</strong>
          {/* 30.10.2017 12:13 */}
        </small>
      </div>
      <p>{comment.text}</p>
    </div>
  );
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchPostById: (id) => dispatch(fetchPostById(id)),
    fetchComments: (id) => dispatch(fetchComments(id)),
    addComment: (id, text) => dispatch(addComment(id, text)),
  };
};

const mapStateToProps = (state, props) => ({
  post: state?.postReducer?.post,
  isLoading: state?.postReducer?.postIsLoading,
  error: state?.postReducer?.postError,
  comments: state?.commentReducer?.comments,
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
