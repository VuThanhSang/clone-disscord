const channelModel = require("../models/channel.model");

const create = async (data) => {
  try {
    const result = await channelModel.create(data);
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

module.exports = {
  create,
  joinChannel,
  leaveChannel,
};
