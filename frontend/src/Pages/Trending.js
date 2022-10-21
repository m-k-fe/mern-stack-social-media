import React from "react";
import { useSelector } from "react-redux";
import LeftNav from "../Components/LeftNav";
import Card from "../Components/Post/Card";
import FriendsHint from "../Components/Profil/FriendsHint";
import Trends from "../Components/Trends";

function Trending() {
  const { userData } = useSelector((state) => state.auth);
  const trends = useSelector((state) => state.trends);
  return (
    <div className="trending-page">
      <LeftNav />
      <div className="main">
        <ul>
          {trends && trends.map((item) => <Card post={item} key={item._id} />)}
        </ul>
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <Trends />
          {userData && <FriendsHint />}
        </div>
      </div>
    </div>
  );
}

export default Trending;
