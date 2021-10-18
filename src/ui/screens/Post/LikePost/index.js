import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { connect } from "react-redux";
import { addLike } from "../../../../core/actions/like";

function LikePost({ id, likes, addLike, fetchPostById }) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [liked, setLiked] = useState(false);

  const likePost = async () => {
    try {
      setLiked(null);
      setError(null);
      setIsLoading(true);

      await addLike(id);
      await fetchPostById(id);

      setLiked(true);
    } catch (e) {
      setLiked(true);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "end" }}>
      <div onClick={() => likePost(id)}>
        {!liked ? (
          <Icon.HandThumbsUp
            style={{ cursor: "pointer", marginInline: "5px" }}
          />
        ) : (
          <Icon.HandThumbsUpFill
            style={{ cursor: "pointer", marginInline: "5px" }}
          />
        )}

        {likes ?? 0}
      </div>

      <span>{!error && liked ? "You have liked this post" : null}</span>
      <span>{error ? "You have already liked this post" : null}</span>
    </div>
  );
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    addLike: (id) => dispatch(addLike(id)),
  };
};

const mapStateToProps = (state, props) => ({
  error: state?.likeReducer?.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(LikePost);
