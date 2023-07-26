import * as httpRequest from '~/utils/HttpRequest';

export const updateUser = async (data) => {
    try {
        const res = await httpRequest.put(`user/update`, data, {
            'Content-Type': 'multipart/form-data',
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
