const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const channelModel = require("./channel.model");
const serverCollectionName = "Server";

const serverCollectionSchema = Joi.object({
  name: Joi.string().required(),
  member: Joi.array().items(Joi.string()).default([]),
  channelOrder: Joi.array().items(Joi.string()).default([]),
  ownerId: Joi.string().required(),
  image: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(Date.now()),
});

const validateSchema = async (data) => {
  return await serverCollectionSchema.validateAsync(data, {
    abortEarly: false,
  });
};

const findOneById = async (id) => {
  try {
    const result = await getDB()
      .collection(serverCollectionName)
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
      .collection(serverCollectionName)
      .insertOne(validatedValue);
    await channelModel.create({
      name: "Chung",
      serverId: result.insertedId.toString(),
      type: "chat",
    });
    await channelModel.create({
      name: "Chung",
      serverId: result.insertedId.toString(),
      type: "voiceChat",
    });
    const GetNewServer = await findOneById(result.insertedId.toString());
    return GetNewServer;
  } catch (error) {
    throw new Error(error);
  }
};

const addMember = async (id, MemberId) => {
  try {
    await getDB()
      .collection(serverCollectionName)
      .findOneAndUpdate({ _id: ObjectId(id) }, { $push: { member: MemberId } });
    return await findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const showChannel = async (serverId) => {
  try {
    const result = await getDB()
      .collection(serverCollectionName)
      .aggregate([
        { $match: { _id: ObjectId(serverId) } },
        { $unwind: "$channelOrder" },
        { $addFields: { channel: { $toObjectId: "$channelOrder" } } },
        {
          $lookup: {
            from: "Channel",
            localField: "channel",
            foreignField: "_id",
            as: "Channels",
          },
        },
      ])
      .toArray();
    // console.log(result);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteServer = async (id) => {
  try {
    await getDB()
      .collection(serverCollectionName)
      .deleteOne({ _id: ObjectId(id) });
    await channelModel.deleteChannelOfServer(id);
    return "delete Successfully";
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  create,
  addMember,
  showChannel,
  deleteServer,
};
