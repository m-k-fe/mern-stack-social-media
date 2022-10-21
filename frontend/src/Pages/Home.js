import React from "react";
import { useSelector } from "react-redux";
import LeftNav from "../Components/LeftNav";
import NewPostForm from "../Components/Post/NewPostForm";
import Thread from "../Components/Thread";
import Log from "../Components/Auth/Index";
import Trends from "../Components/Trends";
import FriendsHint from "../Components/Profil/FriendsHint";

function Home() {
  const { userData } = useSelector((state) => state.auth);
  return (
    <div className="home">
      <LeftNav />
      <div className="main">
        <div className="home-header">
          {userData && userData._id ? (
            <NewPostForm />
          ) : (
            <Log register={false} login={true} />
          )}
        </div>
        <Thread />
      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">
            <Trends />
            {userData && <FriendsHint />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
