import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Message, MessagesSliceState } from "./types";
import { reqGetMessages } from "./asyncActions";

const initialState: MessagesSliceState = {
  messages: [],
  message: "",
  isLoading: true,
  statusCode: null,
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state: MessagesSliceState, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(reqGetMessages.pending, (state, action) => {
        state.message = "";
        state.isLoading = true;
        state.statusCode = null;
    });
    builder.addCase(reqGetMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload.data;
        state.message = action.payload.message;
        state.statusCode = action.payload.statusCode;
    });
    builder.addCase(reqGetMessages.rejected, (state, action) => {
        state.message = "";
        state.isLoading = false;
        state.statusCode = null;
    });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
