import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import StoreAPI from "Services/StoreAPI";

interface State {
  stores: any[];
  storesDetail: any;
  isloading: boolean;
  error?: string | null;
}

const initialState: State = {
  stores: [],
  storesDetail: [],
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

export const addStore = createAsyncThunk(
  "store/addStore",
  async (data: any) => {
    try {
      const result = await StoreAPI.addStore(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteStore = createAsyncThunk(
  "store/deleteStore",
  async (id: string) => {
    try {
      const result = await StoreAPI.deleteStore(id);
      return result;
    } catch (error) {
      throw error;
    }
  },
);

const StoreSlice = createSlice({
  name: "store",

  initialState,

  reducers: {
    addStoreDetail: (state, { payload }) => {
      state.storesDetail = payload;
    },
  },

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

export const { addStoreDetail } = StoreSlice.actions;

export default StoreSlice.reducer;
