import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StoreAPI from "Services/StoreAPI";

interface State {
  stores: any[];
  isloading: boolean;
  error?: string | null;
}

const initialState: State = {
  stores: [],
  isloading: false,
  error: null,
};

export const getStoreList = createAsyncThunk("store/getStoreList", async () => {
  try {
    const data = await StoreAPI.getStoreList();
    return data;
  } catch (error) {
    throw error;
  }
});

const StoreSlice = createSlice({
  name: "store",

  initialState,

  reducers: {},

  extraReducers(builder) {
    builder.addCase(getStoreList.pending, (state) => {
      state.isloading = true;
    });

    builder.addCase(getStoreList.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.stores = payload;
    });

    builder.addCase(getStoreList.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });
  },
});

export default StoreSlice.reducer;
