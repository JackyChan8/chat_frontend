import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { reqSignUp, reqSignIn } from "./asyncActions";
import { AuthSliceState } from "./types";

const initialState: AuthSliceState = {
  message: "",
  isLoading: false,
  statusCode: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    // -------------------------reqSignUp--------------------------------
    builder.addCase(reqSignUp.pending, (state, action) => {
      state.isLoading = true;
      state.message = "";
      state.statusCode = null;
    });
    builder.addCase(reqSignUp.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.statusCode = action.payload.statusCode;
      state.isLoading = false;
    });
    builder.addCase(reqSignUp.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "";
      state.statusCode = null;
    });
    // -------------------------reqSignIn--------------------------------
    builder.addCase(reqSignIn.pending, (state, action) => {
      state.isLoading = true;
      state.message = "";
      state.statusCode = null;
    });
    builder.addCase(reqSignIn.fulfilled, (state, action) => {
      state.message = action.payload.message;
      state.statusCode = action.payload.statusCode;
      if (action.payload.access_token) {
        localStorage.setItem("token", action.payload.access_token);
      }
      state.isLoading = false;
    });
    builder.addCase(reqSignIn.rejected, (state, action) => {
      state.isLoading = false;
      state.message = "";
      state.statusCode = null;
    });
  },
});

export const { setMessage } = authSlice.actions;

export default authSlice.reducer;
