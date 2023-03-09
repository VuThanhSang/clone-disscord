import * as httpRequest from '~/utils/HttpRequest';

export const getChannelMessage = async (channelId) => {
    try {
        const res = await httpRequest.get(`message/showChannelMessage/${channelId}?paging=1`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
