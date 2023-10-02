import $api from '@/http/index';

export default class ProfileService {
    static async getProfileInfo() {
        const res = await $api.get('user/info')
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
        return res;
    }
}