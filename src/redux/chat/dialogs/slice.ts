import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { reqCreateDialog, reqGetDialogs } from './asyncActions';
import { Dialog, DialogsSliceState, DialogUpdateLastMessage } from "./types";

const initialState: DialogsSliceState = {
    dialogs: [],
    message: "",
    isLoading: true,
    statusCode: null,
    currentDialogId: null,
}

const dialogsSlice = createSlice({
    name: "dialogs",
    initialState,
    reducers: {
        setMessage: (state: DialogsSliceState, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        setCurrentDialogId: (state: DialogsSliceState, action: PayloadAction<number>) => {
            state.currentDialogId = action.payload;
        },
        changeLastMessage: (state: DialogsSliceState, action: PayloadAction<DialogUpdateLastMessage>) => {
            const idx = state.dialogs.findIndex((el) => el.id === action.payload.dialogId);
            state.dialogs[idx].lastMessage = action.payload.text;
        },
        incrementCountMessages: (state: DialogsSliceState, action: PayloadAction<number>) => {
            const idx = state.dialogs.findIndex((el) => el.id === action.payload);
            state.dialogs[idx].unreadCount += 1;
        },
        setCountMessagesZero: (state: DialogsSliceState, action: PayloadAction<number | null>) => {
            const idx = state.dialogs.findIndex((el) => el.id === action.payload);
            state.dialogs[idx].unreadCount = 0;
        },
        addDialog: (state: DialogsSliceState, action: PayloadAction<Dialog>) => {
            state.dialogs.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(reqCreateDialog.pending, (state, action) => {
            state.message = "";
            state.isLoading = true;
            state.statusCode = null;
        })
        builder.addCase(reqCreateDialog.fulfilled, (state, action) => {
            state.isLoading = false;
            state.message = action.payload.message;
            state.statusCode = action.payload.statusCode;
        })
        builder.addCase(reqCreateDialog.rejected, (state, action) => {
            state.message = "";
            state.isLoading = false;
            state.statusCode = null;
        })

        builder.addCase(reqGetDialogs.pending, (state, action) => {
            state.dialogs = [];
            state.message = "";
            state.isLoading = true;
            state.statusCode = null;
        })
        builder.addCase(reqGetDialogs.fulfilled, (state, action) => {
            state.isLoading = false;
            state.dialogs = action.payload.data;
            state.message = action.payload.message;
            state.statusCode = action.payload.statusCode;
        })
        builder.addCase(reqGetDialogs.rejected, (state, action) => {
            state.dialogs = [];
            state.message = "";
            state.isLoading = false;
            state.statusCode = null;
        })
    }
})

export const {
    addDialog,
    setMessage,
    setCurrentDialogId,
    changeLastMessage,
    incrementCountMessages,
    setCountMessagesZero
} = dialogsSlice.actions;

export default dialogsSlice.reducer;
