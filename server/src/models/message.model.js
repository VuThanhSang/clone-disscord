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
  createdAt: Joi.string().default(""),
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
    // console.log(validatedValue);
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

const deleteMessageOfChannel = async (id) => {
  try {
    await getDB()
      .collection(messageCollectionName)
      .deleteMany({ targetId: id, targetType: "channel" });
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
const showChannelMessage = async (channelId, paging) => {
  try {
    const amount = await getDB()
      .collection(messageCollectionName)
      .find({ targetId: channelId })
      .count();
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
      .sort({ createdAt: -1 })
      .skip((paging - 1) * 15)
      .limit(15)
      .toArray();
    return { data: result, paging: Math.ceil(amount / 15) };
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
  deleteMessageOfChannel,
};
