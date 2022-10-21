import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FollowHandler from "../Profil/FollowHandler";

function FriendsHint() {
  const { userData } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [playOnce, setPlayOnce] = useState(true);
  const [friendsHint, setFriendsHint] = useState([]);
  useEffect(() => {
    const notFriendsList = () => {
      let array = [];
      users.map((item) => {
        if (item._id !== userData._id && !item.followers.includes(userData._id))
          return array.push(item._id);
      });
      array.sort(() => 0.5 - Math.random());
      if (window.innerHeight > 780) array.length = 5;
      else if (window.innerHeight > 720) array.length = 4;
      else if (window.innerHeight > 615) array.length = 2;
      else if (window.innerHeight > 540) array.length = 1;
      else array.length = 0;
      setFriendsHint(array);
    };
    if (users && userData && playOnce) {
      notFriendsList();
      setIsLoading(false);
      setPlayOnce(false);
    }
  }, [users, userData, playOnce]);
  return (
    <div className="get-friends-container">
      <h4>Suggestions</h4>
      {isLoading ? (
        <div className="icon">
          <i className="fa fa-spinner fa-pulse"></i>
        </div>
      ) : (
        <ul>
          {users &&
            friendsHint &&
            friendsHint.map((item) => {
              for (let i = 0; i < users.length; i++) {
                if (item === users[i]._id) {
                  return (
                    <li className="user-hint" key={item}>
                      <img src={users[i].picture} alt="user-pic" />
                      <p>{users[i].pseudo}</p>
                      <FollowHandler
                        idToFollow={users[i]._id}
                        type={"suggestion"}
                      />
                    </li>
                  );
                }
              }
            })}
        </ul>
      )}
    </div>
  );
}

export default FriendsHint;
