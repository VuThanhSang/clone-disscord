import * as httpRequest from '~/utils/HttpRequest';

export const createServer = async (data) => {
    try {
        const res = await httpRequest.post('server/create', { ...data });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const deleteServer = async (data) => {
    try {
        const res = await httpRequest.put(`server/delete/${data}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const getListServer = async () => {
    try {
        const res = await httpRequest.get('user/listServerOfUser');
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const createChannel = async (data) => {
    try {
        const res = await httpRequest.post('channel/create', { ...data });
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const joinChannel = async (channelId) => {
    try {
        const res = await httpRequest.post(`channel/join/${channelId}`);
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
export const getUserInChat = async (channelId) => {
    try {
        const res = await httpRequest.get(`channel/getUserInChat/${channelId}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
