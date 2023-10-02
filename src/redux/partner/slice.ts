import { createSlice } from "@reduxjs/toolkit";

import { reqGetPartnerInfo } from "./asyncActions";

import { PartnerSliceState } from "./types";

const initialState: PartnerSliceState = {
    partner: null,
    message: "",
    isLoading: true,
    statusCode: null,
}

const partnerSlice = createSlice({
    name: "partner",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(reqGetPartnerInfo.pending, (state, action) => {
            state.partner = null;
            state.isLoading = true;
            state.message = "";
            state.statusCode = null;
        });
        builder.addCase(reqGetPartnerInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.partner = action.payload.data;
            state.message = action.payload.message;
            state.statusCode = action.payload.statusCode;
        });
        builder.addCase(reqGetPartnerInfo.rejected, (state, action) => {
            state.message = "";
            state.partner = null;
            state.isLoading = false;
            state.statusCode = null;
        });
    }
})

export default partnerSlice.reducer;