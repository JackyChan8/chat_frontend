import $api from '@/http/index';

export default class UsersService {
    static async getUsers() {
        const res = await $api.get('chat/get/users')
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err.response;
        })
        return res;
    }
}