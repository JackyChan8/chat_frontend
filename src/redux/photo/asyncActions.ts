import { createAsyncThunk } from "@reduxjs/toolkit";

import photoService from "@/services/PhotoService";

type UploadPhotoBody = {
    file: File;
};

export const reqUploadPhoto = createAsyncThunk(
    "user/photo/upload", async (formData: UploadPhotoBody) => {
        const response = await photoService.uploadPhoto(formData);
        return response.data;
    }
);
