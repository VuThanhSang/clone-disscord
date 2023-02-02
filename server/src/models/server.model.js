const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");

const serverCollectionName = "Server";

const serverCollectionSchema = Joi.object({
  Name: Joi.string().required(),
  Member: Joi.array().items(Joi.string()).default([]),
  ChannelOrder: Joi.array().items(Joi.string()).default([]),
  Owner: Joi.string().required(),
  Image: Joi.string().default(null),
  createdAt: Joi.date().timestamp().default(Date.now()),
  updatedAt: Joi.date().timestamp().default(null),
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
      .findOneAndUpdate({ _id: ObjectId(id) }, { $push: { Member: MemberId } });
    return await findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  create,
  addMember,
};
