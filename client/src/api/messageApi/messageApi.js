import * as httpRequest from '~/utils/HttpRequest';

export const getChannelMessage = async (params) => {
    try {
        const res = await httpRequest.get(
            `message/showChannelMessage/${params.currentChannel}?paging=${params.paging}`,
        );
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const sendMessage = async (data) => {
    try {
        const res = await httpRequest.post('message/sendMessage', data, {
            'Content-Type': 'multipart/form-data',
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
