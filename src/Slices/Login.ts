import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoginAPI from "Services/LoginAPI";
interface State {
  loginresult: any[];
  isloading: boolean;
  error?: string;
}
const initialState: State = {
  loginresult: [],
  isloading: false,
  error: undefined,
};

export const LoginAction = createAsyncThunk("auth/Login", async (data: any) => {
  try {
    const result = await LoginAPI.LoginAction(data);
    return result;
  } catch (error) {
    throw error;
  }
});

const LoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export default LoginSlice.reducer;
