import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { likePost, unLikePost } from "../../redux/features/postSlice";

function LikeButton({ post }) {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const { uid } = useSelector((state) => state.auth);
  const like = () => {
    if (uid) {
      dispatch(likePost({ postId: post._id, userId: uid }));
    }
    setLiked(true);
  };
  const unLike = () => {
    if (uid) {
      dispatch(unLikePost({ postId: post._id, userId: uid }));
    }
    setLiked(false);
  };
  useEffect(() => {
    if (uid) {
      if (post.likers.includes(uid)) setLiked(true);
      else setLiked(false);
    }
  }, [uid, post.likers, liked]);
  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./images/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Login To Like A Post!!</div>
        </Popup>
      )}
      {uid && liked === false && (
        <img src="./images/icons/heart.svg" onClick={like} alt="like" />
      )}
      {uid && liked && (
        <img
          src="./images/icons/heart-filled.svg"
          onClick={unLike}
          alt="unlike"
        />
      )}
      <span>{post.likers.length}</span>
    </div>
  );
}

export default LikeButton;
