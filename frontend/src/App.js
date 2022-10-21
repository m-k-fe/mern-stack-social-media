import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Trending from "./Pages/Trending";
import { getAllPosts } from "./redux/features/allPostsSlice";
import { checkUser } from "./redux/features/authSlice";
import { getUsers } from "./redux/features/userSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUser());
    dispatch(getUsers());
    dispatch(getAllPosts());
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
