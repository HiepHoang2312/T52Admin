import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClientAPI from "Services/ClientAPI";

interface State {
  clientList: any[];
  isloading: boolean;
  error?: string | null;
}

const initialState: State = {
  clientList: [],
  isloading: false,
  error: null,
};

export const getClientList = createAsyncThunk(
  "client/getClientList",
  async () => {
    try {
      const data = await ClientAPI.getClientList();
      return data;
    } catch (error) {
      throw error;
    }
  },
);

export const addClient = createAsyncThunk(
  "client/addClient",
  async (data: any) => {
    try {
      const result = await ClientAPI.addClient(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);

export const deleteClient = createAsyncThunk(
  "client/deleteClient",
  async (id: string) => {
    try {
      const result = await ClientAPI.deleteClient(id);
      return result;
    } catch (error) {
      throw error;
    }
  },
);

export const updateClient = createAsyncThunk(
  "client/updateClient",
  async (data: any) => {
    try {
      const result = await ClientAPI.updateClient(data);
      return result;
    } catch (error) {
      throw error;
    }
  },
);

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get list

    builder.addCase(getClientList.pending, (state) => {
      state.isloading = true;
    });

    builder.addCase(getClientList.fulfilled, (state, { payload }) => {
      state.isloading = false;
      state.clientList = payload;
    });

    builder.addCase(getClientList.rejected, (state, { error }) => {
      state.isloading = true;
      state.error = error.message;
    });

    //end get list
  },
});
export default clientSlice.reducer;
