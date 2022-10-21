import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../redux/features/postSlice";
import { timestampParser } from "../../util";
import FollowHandler from "../Profil/FollowHandler";
import EditDeleteComment from "./EditDeleteComment";

function CardComments({ post }) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { userData } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const handleComment = (e) => {
    e.preventDefault();
    if (text)
      dispatch(
        commentPost({
          id: post._id,
          commenterId: userData._id,
          commenterPseudo: userData.pseudo,
          text,
        })
      );
    setText("");
  };
  return (
    <div className="comments-container">
      {post.comments.map((comment) => (
        <div
          className={
            comment.commenterId === userData._id
              ? "comment-container client"
              : "comment-container"
          }
          key={comment._id}
        >
          <div className="left-part">
            <img
              src={
                users &&
                users
                  .map((user) => {
                    if (user._id === comment.commenterId) return user.picture;
                    return null;
                  })
                  .join("")
              }
              alt="commenter-pic"
            />
          </div>
          <div className="right-part">
            <div className="comment-header">
              <div className="pseudo">
                <h3>{comment.commenterPseudo}</h3>
                {comment.commenterId !== userData._id && (
                  <FollowHandler
                    idToFollow={comment.commenterId}
                    type={"card"}
                  />
                )}
              </div>
              <span>{timestampParser(comment.timestamp)}</span>
            </div>
            <p>{comment.text}</p>
            <EditDeleteComment comment={comment} postId={post._id} />
          </div>
        </div>
      ))}
      {userData._id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Leave A Comment"
          />
          <br />
          <input type="submit" value="Send" />
        </form>
      )}
    </div>
  );
}

export default CardComments;
