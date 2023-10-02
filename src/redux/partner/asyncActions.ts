import { createAsyncThunk } from "@reduxjs/toolkit";

import PartnerService from "@/services/PartnerService";

export const reqGetPartnerInfo = createAsyncThunk("chat/get/partner", async (dialogId: number) => {
    const response = await PartnerService.getPartnerInfo(dialogId);
    return response.data;
})