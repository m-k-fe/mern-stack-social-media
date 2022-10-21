import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../redux/features/postSlice";
import Card from "./Post/Card";

function Thread() {
  const dispatch = useDispatch();
  const [count, setCount] = useState(5);
  const [loadPost, setLoadPost] = useState(true);
  const posts = useSelector((state) => state.post);
  const loadMore = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >
      document.scrollingElement.scrollHeight
    ) {
      setLoadPost(true);
    }
  };
  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts(count));
      setLoadPost(false);
      setCount(count + 5);
    }
    window.addEventListener("scroll", loadMore);
    return () => window.removeEventListener("scroll", loadMore);
  }, [loadPost, dispatch, count]);
  return (
    <div className="thread-container">
      <ul>
        {posts && posts.map((item) => <Card key={item._id} post={item} />)}
      </ul>
    </div>
  );
}

export default Thread;
