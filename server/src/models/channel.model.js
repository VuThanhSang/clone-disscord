const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const channelCollectionName = "Channel";

const channelCollectionSchema = Joi.object({
  Name: Joi.string().required(),
  serverId: Joi.string().required(),
  type: Joi.string().required(),
  inChat: Joi.array().items(Joi.string()).default([]),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
});
const validateSchema = async (data) => {
  return await channelCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};
const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(userCollectionName)
      .findOne({ _id: ObjectId(id) });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const create = async (data) => {
  try {
    const validatedValue = await validateSchema(data);
    const result = await getDB()
      .collection(channelCollectionName)
      .insertOne(validatedValue);
    //find and return added data
    const GetNewServer = await findOneById(result.insertedId.toString());
    return GetNewServer;
  } catch (error) {
    throw new Error(error);
  }
};

const joinChannel = async (id, userId) => {
  try {
    const result = await getDB()
      .collection(channelCollectionName)
      .findOneAndUpdate({ _id: ObjectId(id) }, { $push: { inChat: userId } });
    return await findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};
const leaveChannel = async (id, userId) => {
  try {
    const result = await getDB()
      .collection(channelCollectionName)
      .updateOne({ _id: ObjectId(id) }, { $pull: { inChat: userId } });
    return await findOneById(id);
  } catch (error) {}
};

module.exports = {
  create,
  joinChannel,
  leaveChannel,
};
