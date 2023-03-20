const messageModel = require("../models/message.model");
require("dotenv");
const cloudinary = require("cloudinary").v2;
const sendMessage = async (req) => {
  try {
    const source = req.files?.map((data) => {
      return {
        data: data.path,
        type: data.mimetype,
        filename: data.filename,
      };
    });
    const addData = { ...req.body, source, sourceId: req.user.sub };
    const result = await messageModel.sendMessage(addData);
    return result;
  } catch (error) {
    if (req.files) {
      req.files.map((item) => {
        cloudinary.uploader.destroy(item.filename);
      });
    }
    throw new Error(error);
  }
};

const removeSource = async (id, userId) => {
  try {
    const message = await messageModel.findOneById(id);
    if (message.sourceId === userId) {
      const update = { ...message, source: [] };
      await messageModel.editMessage(update, id);
      message.source.map((item) => {
        cloudinary.uploader.destroy(item.filename);
      });
      return { status: true, message: "successfully" };
    } else {
      return { status: false, message: "You are not authorized to do this" };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const deleteMessage = async (id, userId) => {
  try {
    const message = await messageModel.findOneById(id);
    if (message.sourceId === userId) {
      await message.deleteMessage(id);
      message.source.map((item) => {
        cloudinary.uploader.destroy(item.filename);
      });
      return { status: true, message: "successfully" };
    } else {
      return { status: false, message: "You are not authorized to do this" };
    }
  } catch (error) {
    throw new Error(error);
  }
};
const editMessage = async (id, data) => {
  try {
    const result = await messageModel.editMessage(data, id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const showDirectMessage = async (data) => {
  try {
    const result = await messageModel.showDirectMessage(
      data.sourceId,
      data.targetId
    );
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const showChannelMessage = async (channelId, paging) => {
  try {
    const result = await messageModel.showChannelMessage(channelId, paging);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  sendMessage,
  editMessage,
  showDirectMessage,
  showChannelMessage,
  removeSource,
  deleteMessage,
};
