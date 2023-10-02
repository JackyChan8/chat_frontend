import $api from '@/http/index';

type CreateDialogFormData = {
    partnerId: number;
};

export default class DialogsService {
    static async createDialog(formData: CreateDialogFormData) {
        const res = await $api.post('chat/create', formData)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
        return res;
    }
    static async getDialogs() {
        const res = await $api.get('chat/get/dialogs')
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
        return res;
    }
}