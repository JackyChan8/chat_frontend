import $api from '@/http/index';

export default class MessagesService {
    static async getMessages(dialogId: number) {
        const res = await $api.get(`chat/get/messages/${dialogId}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
        return res;
    }
}