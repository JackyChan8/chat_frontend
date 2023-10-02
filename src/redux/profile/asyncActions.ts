import { createAsyncThunk } from "@reduxjs/toolkit";

import ProfileService from "@/services/ProfileService";

export const reqGetMyInfo = createAsyncThunk("user/info", async () => {
    const response = await ProfileService.getProfileInfo();
    return response.data;
})