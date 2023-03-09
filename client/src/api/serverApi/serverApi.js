import * as httpRequest from '~/utils/HttpRequest';

export const getListServer = async () => {
    try {
        const res = await httpRequest.get('user/listServerOfUser');
        return res;
    } catch (error) {
        console.log(error);
    }
};
