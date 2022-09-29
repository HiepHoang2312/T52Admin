import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import NewsAPI from "Services/NewsAPI";

interface State {
  newsList: any[];
  isloading: boolean;
  error?: string | null;
}

const initialState: State = {
  newsList: [],
  isloading: false,
  error: null,
};

export const getNewsList = createAsyncThunk("news/getNewList", async () => {
  try {
    const data = await NewsAPI.getNewList();
    return data;
  } catch (error) {
    throw error;
  }
});

const newsSlice = createSlice({
  name: "partner",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    // get list

    builder.addCase(getNewsList.pending, (state) => {
      state.isloading = true;
    });

    builder.addCase(getNewsList.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.newsList = payload;
    });

    builder.addCase(getNewsList.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });

    // end get list
  },
});
export default newsSlice.reducer;
