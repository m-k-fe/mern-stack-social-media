import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateBio = createAsyncThunk(
  "updateBio/user",
  async ({ id, bio }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:5000/api/users/${id}`,
        withCredentials: true,
        data: {
          bio,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const getUsers = createAsyncThunk("getUsers/user", async () => {
  const response = await axios({
    method: "get",
    url: "http://localhost:5000/api/users",
    withCredentials: true,
  });
  return response.data;
});

export const follow = createAsyncThunk(
  "follow/user",
  async ({ id, idToFollow }, { rejectWithValue }) => {
    try {
      await axios({
        method: "patch",
        url: `http://localhost:5000/api/users/follow/${id}`,
        withCredentials: true,
        data: {
          idToFollow,
        },
      });
      return idToFollow;
    } catch (err) {
      console.log(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const unFollow = createAsyncThunk(
  "follow/user",
  async ({ id, idToUnfollow }, { rejectWithValue }) => {
    try {
      await axios({
        method: "patch",
        url: `http://localhost:5000/api/users/unfollow/${id}`,
        withCredentials: true,
        data: {
          idToUnfollow,
        },
      });
      return idToUnfollow;
    } catch (err) {
      console.log(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    error: "",
    bio: "",
    users: [],
    following: [],
  },
  reducers: {},
  extraReducers: {
    [updateBio.pending]: (state) => {
      state.error = false;
    },
    [updateBio.fulfilled]: (state, { payload }) => {
      state.error = false;
      state.bio = payload.bio;
    },
    [updateBio.rejected]: (state, { payload }) => {
      state.error = payload;
    },
    [getUsers.pending]: (state) => {
      state.users = [];
    },
    [getUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
    },
    [getUsers.rejected]: (state) => {
      state.users = [];
    },
    [follow.pending]: (state) => {
      state.following = [];
    },
    [follow.fulfilled]: (state, { payload }) => {
      state.following = [...state.following, payload];
    },
    [follow.rejected]: (state) => {
      state.following = [];
    },
    [unFollow.pending]: (state) => {
      state.following = [];
    },
    [unFollow.fulfilled]: (state, { payload }) => {
      state.following = state.following.filter((item) => item != payload);
    },
    [unFollow.rejected]: (state) => {
      state.following = [];
    },
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
