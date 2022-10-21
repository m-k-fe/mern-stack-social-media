import { configureStore } from "@reduxjs/toolkit";
import allPostsSlice from "./features/allPostsSlice";
import authSlice from "./features/authSlice";
import postSlice from "./features/postSlice";
import trendsSlice from "./features/trendsSlice";
import uploadSlice from "./features/uploadSlice";
import userSlice from "./features/userSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    upload: uploadSlice,
    user: userSlice,
    post: postSlice,
    allPosts: allPostsSlice,
    trends: trendsSlice,
  },
});
export default store;
