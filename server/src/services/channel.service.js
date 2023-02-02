const channelModel = require("../models/channel.model");

const create = async (data) => {
  try {
    const result = await channelModel.create(data);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const joinChannel = async (data) => {
  try {
    const result = await channelModel.joinChannel(data.id, data.userId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const leaveChannel = async (data) => {
  try {
    const result = await channelModel.leaveChannel(data.id, data.userId);
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
