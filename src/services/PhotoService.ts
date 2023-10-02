import $api from '@/http/index';

type UploadPhotoFormData = {
    file: File;
};

export default class photoService {
    static async uploadPhoto(formData: UploadPhotoFormData) {
        const res = await $api.post('user/photo/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
        return res;
    }
}