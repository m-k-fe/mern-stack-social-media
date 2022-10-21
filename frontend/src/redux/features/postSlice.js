import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPosts = createAsyncThunk("getPosts/postSlice", async (num) => {
  const response = await axios({
    method: "get",
    url: "http://localhost:5000/api/posts",
    withCredentials: true,
  });
  return response.data.slice(0, num);
});

export const addPost = createAsyncThunk("addPost/postSlice", async (data) => {
  await axios({
    method: "post",
    url: "http://localhost:5000/api/posts",
    withCredentials: true,
    data,
  });
});

export const likePost = createAsyncThunk(
  "likePost/postSlice",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      await axios({
        method: "patch",
        url: `http://localhost:5000/api/posts/like-post/${postId}`,
        withCredentials: true,
        data: {
          id: userId,
        },
      });
      return { postId, userId };
    } catch (err) {
      console.log(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const unLikePost = createAsyncThunk(
  "unlikePost/postSlice",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      await axios({
        method: "patch",
        url: `http://localhost:5000/api/posts/unlike-post/${postId}`,
        withCredentials: true,
        data: {
          id: userId,
        },
      });
      return { postId, userId };
    } catch (err) {
      console.log(err.response.data.message);
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "updatePost/postSlice",
  async ({ id, message }, { rejectWithValue }) => {
    try {
      await axios({
        method: "put",
        url: `http://localhost:5000/api/posts/${id}`,
        withCredentials: true,
        data: {
          message,
        },
      });
      return { id, message };
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const deletePost = createAsyncThunk(
  "deletePost/postSlice",
  async (id, { rejectWithValue }) => {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:5000/api/posts/${id}`,
        withCredentials: true,
      });
      return id;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const commentPost = createAsyncThunk(
  "commentPost/postSlice",
  async ({ id, commenterId, commenterPseudo, text }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "patch",
        url: `http://localhost:5000/api/posts/comment-post/${id}`,
        withCredentials: true,
        data: {
          commenterId,
          commenterPseudo,
          text,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const editComment = createAsyncThunk(
  "editComment/postSlice",
  async ({ id, commentId, text }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "patch",
        url: `http://localhost:5000/api/posts/edit-comment-post/${id}`,
        withCredentials: true,
        data: {
          commentId,
          text,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "deleteComment/postSlice",
  async ({ id, commentId }, { rejectWithValue }) => {
    try {
      await axios({
        method: "patch",
        url: `http://localhost:5000/api/posts/delete-comment-post/${id}`,
        withCredentials: true,
        data: {
          commentId,
        },
      });
      return { id, commentId };
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: [],
  extraReducers: {
    [getPosts.fulfilled]: (state, { payload }) => {
      return payload;
    },
    [likePost.fulfilled]: (state, { payload }) => {
      return state.map((item) => {
        if (item._id === payload.postId) {
          return {
            ...item,
            likers: [...item.likers, payload.userId],
          };
        }
        return item;
      });
    },
    [unLikePost.fulfilled]: (state, { payload }) => {
      return state.map((item) => {
        if (item._id === payload.postId) {
          return {
            ...item,
            likers: item.likers.filter((item) => item !== payload.userId),
          };
        }
        return item;
      });
    },
    [updatePost.fulfilled]: (state, { payload }) => {
      return state.map((item) => {
        if (item._id === payload.id)
          return { ...item, message: payload.message };
        return item;
      });
    },
    [deletePost.fulfilled]: (state, { payload }) => {
      return state.filter((item) => item._id !== payload);
    },
    [commentPost.fulfilled]: (state, { payload }) => {
      return state.map((item) => {
        if (item._id === payload._id)
          return { ...item, comments: payload.comments };
        return item;
      });
    },
    [editComment.fulfilled]: (state, { payload }) => {
      return state.map((item) => {
        if (item._id === payload._id)
          return { ...item, comments: payload.comments };
        return item;
      });
    },
    [deleteComment.fulfilled]: (state, { payload }) => {
      return state.map((item) => {
        if (item._id === payload.id)
          return {
            ...item,
            comments: item.comments.filter(
              (ele) => ele._id != payload.commentId
            ),
          };
        return item;
      });
    },
  },
});

export const {} = postSlice.actions;
export default postSlice.reducer;
