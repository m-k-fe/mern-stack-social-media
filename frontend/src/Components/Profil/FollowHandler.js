import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/features/authSlice";
import { follow, unFollow } from "../../redux/features/userSlice";

function FollowHandler({ idToFollow, type }) {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const [isFollowed, setIsFollowed] = useState(false);
  const handleFollow = () => {
    dispatch(follow({ id: userData._id, idToFollow }));
    dispatch(getUser(userData._id));
    setIsFollowed(true);
  };
  const handleUnfollow = () => {
    dispatch(unFollow({ id: userData._id, idToUnfollow: idToFollow }));
    dispatch(getUser(userData._id));
    setIsFollowed(false);
  };
  useEffect(() => {
    if (userData && userData.following.includes(idToFollow))
      setIsFollowed(true);
    else setIsFollowed(false);
  }, [userData, idToFollow]);
  return (
    <>
      {isFollowed && userData && (
        <span onClick={handleUnfollow}>
          {type === "suggestion" && (
            <button className="unfollow-btn">Unfollow</button>
          )}
          {type === "card" && (
            <img src="./images/icons/checked.svg" alt="checked" />
          )}
        </span>
      )}
      {isFollowed === false && userData && (
        <span onClick={handleFollow}>
          {type === "suggestion" && (
            <button className="follow-btn">Follow</button>
          )}
          {type === "card" && (
            <img src="./images/icons/check.svg" alt="check" />
          )}
        </span>
      )}
    </>
  );
}

export default FollowHandler;
