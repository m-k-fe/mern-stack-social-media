import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadImg = createAsyncThunk(
  "uploadImg/upload",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/api/users/upload",
        withCredentials: true,
        data,
      });
      return response.data;
    } catch (err) {
      console.log(err.message);
      return rejectWithValue(err.message);
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    picture: "",
    err: "",
  },
  reducers: {},
  extraReducers: {
    [uploadImg.pending]: (state) => {
      state.picture = "";
      state.error = false;
    },
    [uploadImg.fulfilled]: (state, { payload }) => {
      state.picture = payload.picture;
      state.error = false;
    },
    [uploadImg.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const {} = uploadSlice.actions;
export default uploadSlice.reducer;
