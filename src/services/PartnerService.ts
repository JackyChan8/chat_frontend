import $api from '@/http/index';

export default class PartnerService {
    static async getPartnerInfo(dialogId: number) {
        const res = await $api.get(`chat/get/partner/${dialogId}`)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
        return res;
    }
}