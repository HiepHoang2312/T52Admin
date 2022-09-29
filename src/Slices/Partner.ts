import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PartnerAPI from "Services/PartnerAPI";

interface State {
  partners: any[];
  isloading: boolean;
  error?: string | null;
}

const initialState: State = {
  partners: [],
  isloading: false,
  error: null,
};

export const getPartnerList = createAsyncThunk(
  "partner/getPartnerList",
  async () => {
    try {
      const data = await PartnerAPI.getPartnerList();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

const partnerSlice = createSlice({
  name: "partner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPartnerList.pending, (state) => {
      state.isloading = true;
    });

    builder.addCase(getPartnerList.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.partners = payload;
    });

    builder.addCase(getPartnerList.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });
  },
});

export default partnerSlice.reducer;
