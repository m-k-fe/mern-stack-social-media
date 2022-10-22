import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "loginUser/auth",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/users/login",
        withCredentials: true,
        data: {
          email: user.email,
          password: user.password,
        },
      });
      window.location = "/";
      return response.data;
    } catch (err) {
      console.log(err.response.data.errors);
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const registerUser = createAsyncThunk(
  "registerUser/auth",
  async ({ user, setFormSubmit }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/users/register",
        withCredentials: true,
        data: {
          pseudo: user.pseudo,
          email: user.email,
          password: user.password,
        },
      });
      setFormSubmit(true);
      return response.data;
    } catch (err) {
      console.log(err.response.data.errors);
      return rejectWithValue(err.response.data.errors);
    }
  }
);

export const getUser = createAsyncThunk("getUser/auth", async (id) => {
  if (id) {
    const response = await axios({
      method: "get",
      url: `http://localhost:5000/api/users/${id}`,
      withCredentials: true,
    });
    return response.data;
  }
});

export const checkUser = createAsyncThunk("checkUser/auth", async () => {
  const response = await axios({
    method: "get",
    url: "http://localhost:5000/jwtid",
    withCredentials: true,
  });
  return response.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: null,
    uid: null,
    loading: false,
    loginError: null,
    registerError: null,
    user: null,
  },
  reducers: {},
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.loginError = false;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loginError = false;
      state.user = payload;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.loginError = payload;
    },
    [checkUser.pending]: (state) => {
      state.uid = null;
    },
    [checkUser.fulfilled]: (state, { payload }) => {
      state.uid = payload;
    },
    [checkUser.rejected]: (state) => {
      state.uid = null;
    },
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.registerError = false;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.registerError = false;
      state.user = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.registerError = payload;
    },
    [getUser.pending]: (state) => {
      state.userData = null;
    },
    [getUser.fulfilled]: (state, { payload }) => {
      state.userData = payload;
    },
    [getUser.rejected]: (state) => {
      state.userData = null;
    },
  },
});
export const {} = authSlice.actions;
export default authSlice.reducer;
