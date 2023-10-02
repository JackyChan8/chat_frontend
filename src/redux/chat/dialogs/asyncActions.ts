import { createAsyncThunk } from "@reduxjs/toolkit";

import DialogsService from "@/services/DialogsService";

type ReqCreateDialogBody = {
    partnerId: number;
};

export const reqCreateDialog = createAsyncThunk("chat/create", async (formData: ReqCreateDialogBody) => {
    const response = await DialogsService.createDialog(formData);
    return response.data;
})

export const reqGetDialogs = createAsyncThunk("chat/get/dialogs", async () => {
    const response = await DialogsService.getDialogs();
    return response.data;
})