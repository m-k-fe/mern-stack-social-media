import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTrends } from "../redux/features/trendsSlice";

function Trends() {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.allPosts);
  const { users } = useSelector((state) => state.user);
  const trends = useSelector((state) => state.trends);
  useEffect(() => {
    if (allPosts) {
      const postsArr = Object.keys(allPosts).map((item) => allPosts[item]);
      let sortedArray = postsArr.sort(
        (a, b) => b.likers.length - a.likers.length
      );
      sortedArray = sortedArray.slice(0, 3);
      dispatch(getTrends({ sortedArray }));
    }
  }, [allPosts, dispatch]);
  return (
    <div className="trending-container">
      <h4>Trending</h4>
      <NavLink to="/trending">
        <ul>
          {trends &&
            trends.length &&
            trends.map((item) => (
              <li key={item._id}>
                <div>
                  {item.picture ? (
                    <img src={item.picture} alt="post-pic" />
                  ) : (
                    <img
                      src={users
                        .map((user) => {
                          if (user._id === item.posterId) return user.picture;
                          else return null;
                        })
                        .join("")}
                      alt="profil-pic"
                    />
                  )}
                </div>
                <div className="trend-content">
                  <p>{item.message}</p>
                  <span>Read</span>
                </div>
              </li>
            ))}
        </ul>
      </NavLink>
    </div>
  );
}

export default Trends;
