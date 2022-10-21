import { createSlice } from "@reduxjs/toolkit";
const trendsSlice = createSlice({
  name: "trends",
  initialState: [],
  reducers: {
    getTrends: (state, { payload }) => {
      return payload.sortedArray;
    },
  },
});

export const { getTrends } = trendsSlice.actions;
export default trendsSlice.reducer;
