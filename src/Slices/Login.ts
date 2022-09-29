import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

const LoginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
export default LoginSlice.reducer;
