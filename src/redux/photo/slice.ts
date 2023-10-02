import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { reqUploadPhoto } from "./asyncActions";
import { PhotoSliceState } from "./types";

const initialState: PhotoSliceState = {
  photo: null,
  message: "",
  isLoading: false,
  statusCode: null,
};

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    setMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(reqUploadPhoto.pending, (state, action) => {
      state.isLoading = true;
      state.message = "";
      state.photo = null;
      state.statusCode = null;
    });
    builder.addCase(reqUploadPhoto.fulfilled, (state, action) => {
      state.photo = action.payload.photo;
      state.message = action.payload.message;
      state.statusCode = action.payload.statusCode;
      state.isLoading = false;
    });
    builder.addCase(reqUploadPhoto.rejected, (state, action) => {
      state.photo = null;
      state.isLoading = false;
      state.message = "";
      state.statusCode = null;
    });
  },
});

export const { setMessage } = photoSlice.actions;

export default photoSlice.reducer;
