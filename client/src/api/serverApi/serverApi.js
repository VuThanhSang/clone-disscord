import * as httpRequest from '~/utils/HttpRequest';

export const getListServer = async () => {
    try {
        const res = await httpRequest.get('user/listServerOfUser');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const joinChannel = async (channelId) => {
    try {
        const res = await httpRequest.post(`channel/join/${channelId}`);
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const leaveChannel = async (channelId) => {
    try {
        const res = await httpRequest.post(`channel/leave/${channelId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
