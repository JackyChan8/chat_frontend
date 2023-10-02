import { createAsyncThunk } from "@reduxjs/toolkit";

import MessagesService from "@/services/MessagesService";

export const reqGetMessages = createAsyncThunk('chat/get/messages', async (dialogId: number) => {
    const response = await MessagesService.getMessages(dialogId);
    return response.data;
})