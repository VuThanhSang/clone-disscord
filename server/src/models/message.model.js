const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const messageCollectionName = "message";

const messageCollectionSchema = Joi.object({
  sourceId: Joi.string().required(),
  targetType: Joi.string().required(),
  targetId: Joi.string().required(),
  message: Joi.string().required(),
  source: Joi.array()
    .items({ type: Joi.string(), data: Joi.string(), filename: Joi.string() })
    .default([]),
  reactions: Joi.array().items({
    emoji: Joi.string().default(null),
    amount: Joi.number().default(0),
  }),
  isReply: Joi.boolean().default(false),
  isDestroy: Joi.boolean().default(false),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now()),
});

const validateSchema = async (data) => {
  return await messageCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};
const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(messageCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
//sourceId, targetId, message , targetType
const sendMessage = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const result = await getDB()
      .collection(messageCollectionName)
      .insertOne(validatedValue);
    const getNewMessage = await findOneById(result.insertedId.toString());
    return getNewMessage;
  } catch (error) {
    throw new Error(error);
  }
};

const editMessage = async (updateData, id) => {
  try {
    const result = await getDB()
      .collection(messageCollectionName)
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: updateData });
    return await findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const showDirectMessage = async (sourceId, targetId) => {
  try {
    const result = await getDB()
      .collection(messageCollectionName)
      .find({ sourceId: sourceId, targetId: targetId })
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const deleteMessage = async (id) => {
  try {
    await getDB()
      .collection(messageCollectionName)
      .deleteOne({ _id: ObjectId(id) });
    return "deleted successfully";
  } catch (error) {
    throw new Error(error);
  }
};
const findInChat = async (findData, sourceId, targetId, type) => {
  try {
    const dataChat = await show;
  } catch (error) {}
};
const showChannelMessage = async (channelId, paging = 1) => {
  try {
    const result = await getDB()
      .collection(messageCollectionName)
      .aggregate([
        { $match: { targetId: channelId } },
        { $addFields: { _sourceId: { $toObjectId: "$sourceId" } } },
        {
          $lookup: {
            from: "Users",
            localField: "_sourceId",
            foreignField: "_id",
            as: "User",
          },
        },
      ])
      .toArray();
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
  findOneById,
  deleteMessage,
};
