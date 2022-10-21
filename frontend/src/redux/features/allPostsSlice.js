import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPosts = createAsyncThunk(
  "getAllPosts/postSlice",
  async () => {
    const response = await axios({
      method: "get",
      url: "http://localhost:5000/api/posts",
      withCredentials: true,
    });
    return response.data;
  }
);

const allPostsSlice = createSlice({
  name: "allPosts",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getAllPosts.fulfilled]: (state, { payload }) => {
      return payload;
    },
  },
});

export const {} = allPostsSlice.actions;
export default allPostsSlice.reducer;
