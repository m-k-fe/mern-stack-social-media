import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../redux/features/postSlice";
import { dateParser } from "../../util";
import FollowHandler from "../Profil/FollowHandler";
import CardComments from "./CardComments";
import DeleteCard from "./DeleteCard";
import LikeButton from "./LikeButton";

function Card({ post }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const { users } = useSelector((state) => state.user);
  const { userData } = useSelector((state) => state.auth);
  const updateItem = () => {
    if (textUpdate) dispatch(updatePost({ id: post._id, message: textUpdate }));
    setIsUpdated(false);
  };
  useEffect(() => {
    users && setIsLoading(false);
  }, [users]);
  return (
    <li className="card-container">
      {isLoading ? (
        <i className="fa fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                users &&
                users
                  .map((item) => {
                    if (item._id === post.posterId) return item.picture;
                  })
                  .join("")
              }
              alt="user-pic"
            />
          </div>
          <div className="card-right">
            <div className="card-header">
              <div className="pseudo">
                <h3>
                  {users &&
                    users
                      .map((item) => {
                        if (item._id === post.posterId) return item.pseudo;
                      })
                      .join("")}
                </h3>
                {userData && post.posterId !== userData._id && (
                  <FollowHandler idToFollow={post.posterId} type={"card"} />
                )}
              </div>
              <span>{dateParser(post.createdAt)}</span>
            </div>
            {isUpdated === false && <p>{post.message}</p>}
            {isUpdated && (
              <div className="update-post">
                <textarea
                  defaultValue={post.message}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="button-container">
                  <button className="btn" onClick={updateItem}>
                    Commit Changes
                  </button>
                </div>
              </div>
            )}
            {post.picture && (
              <img src={post.picture} alt="card-pic" className="card-pic" />
            )}
            {post.video && (
              <iframe
                width="500"
                height="300"
                src={post.video}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={post._id}
              ></iframe>
            )}
            {userData && userData._id === post.posterId && (
              <div className="button-container">
                <div onClick={() => setIsUpdated(!isUpdated)}>
                  <img src="./images/icons/edit.svg" />
                </div>
                <DeleteCard id={post._id} />
              </div>
            )}
            <div className="card-footer">
              <div className="comment-icon">
                <img
                  src="./images/icons/message1.svg"
                  alt="comment"
                  onClick={() => setShowComments(!showComments)}
                />
                <span>{post.comments.length}</span>
              </div>
              <LikeButton post={post} />
              <img src="./images/icons/share.svg" alt="share" />
            </div>
            {showComments && <CardComments post={post} />}
          </div>
        </>
      )}
    </li>
  );
}

export default Card;
