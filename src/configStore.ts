import { configureStore } from "@reduxjs/toolkit";

import login from "Slices/Login";
import partner from "Slices/Partner";
import storeSlice from "Slices/Store";
import news from "Slices/News";
import clientSlice from "Slices/Client";

const store = configureStore({
  reducer: { login, partner, storeSlice, news, clientSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
