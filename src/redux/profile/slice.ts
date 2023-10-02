import { createSlice } from "@reduxjs/toolkit";

import { reqGetMyInfo } from "./asyncActions";

import { ProfileSliceState } from "./types";

const initialState: ProfileSliceState = {
    profile: null,
    message: "",
    isLoading: true,
    statusCode: null,
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(reqGetMyInfo.pending, (state, action) => {
            state.profile = null;
            state.isLoading = true;
            state.message = "";
            state.statusCode = null;
        });
        builder.addCase(reqGetMyInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profile = action.payload.data;
            state.message = action.payload.message;
            state.statusCode = action.payload.statusCode;
        });
        builder.addCase(reqGetMyInfo.rejected, (state, action) => {
            state.message = "";
            state.profile = null;
            state.isLoading = false;
            state.statusCode = null;
        });
    }
})

export default profileSlice.reducer;