const channelModel = require("../models/channel.model");

const create = async (data) => {
  try {
    const result = await channelModel.create({
      ...data,
      createdAt: Date.now().toString(),
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const joinChannel = async (channelId, userId) => {
  try {
    const result = await channelModel.joinChannel(channelId, userId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const leaveChannel = async (channelId, userId) => {
  try {
    const result = await channelModel.leaveChannel(channelId, userId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserInChat = async (channelId) => {
  try {
    const result = await channelModel.getUserInChat(channelId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  create,
  joinChannel,
  leaveChannel,
  getUserInChat,
};
