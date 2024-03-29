const Joi = require("joi");
const { getDB } = require("../config/mongodb");
const { ObjectId } = require("mongodb");
const bcryptjs = require("bcryptjs");
const { cloneDeep, get } = require("lodash");
const serverModel = require("./server.model");
const userCollectionName = "Users";

const userCollectionSchema = Joi.object({
  username: Joi.string().max(50).default(null),
  password: Joi.string().min(5).max(30).trim().default(null),
  createdAt: Joi.string().default(""),
  updatedAt: Joi.date().timestamp().default(null),
  email: Joi.string().required().email(),
  mobile: Joi.string().default(null),
  lastLogin: Joi.date().timestamp().default(null),
  intro: Joi.string().default(null),
  profile: Joi.string().default(null),
  authGoogleId: Joi.string().default(null),
  authGithubId: Joi.string().default(null),
  authType: Joi.string().valid("local", "google", "github").default("local"),
});

const encodePassword = async (data) => {
  try {
    //generate a salt
    const tempData = cloneDeep(data);
    const salt = await bcryptjs.genSalt(10);
    const passwordHashed = await bcryptjs.hash(tempData.password, salt);
    tempData.password = passwordHashed;
    return tempData;
  } catch (error) {
    throw new Error(error);
  }
};
const validateSchema = async (data) => {
  return await userCollectionSchema.validateAsync(data, { abortEarly: false });
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
const lookupEmail = async (email) => {
  const valid = await getDB()
    .collection(userCollectionName)
    .findOne({ email: email });
  if (valid) {
    throw new Error("email is already exist");
  }
};
const login = async (email) => {
  try {
    const result = await getDB()
      .collection(userCollectionName)
      .findOne({ email: email, authType: "local" });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const signUp = async (data) => {
  try {
    // validate data
    //check email exist
    const validatedValue = await validateSchema(data);
    let insertValue = cloneDeep(validatedValue);
    if (validatedValue.authType === "local") {
      const schema = Joi.string().external(lookupEmail);
      await schema.validateAsync(data.email);
      //encode password
      insertValue = await encodePassword(validatedValue);
    }

    //add data to database
    const result = await getDB()
      .collection(userCollectionName)
      .insertOne(insertValue);
    //find and return added data
    const GetNewUser = await findOneById(result.insertedId.toString());
    return GetNewUser;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllUser = async () => {
  const result = await getDB()
    .collection(userCollectionName)
    .find({})
    .toArray();
  return result;
};

const listServerOfUser = async (userId) => {
  try {
    const servers = await getDB()
      .collection("Server")
      .aggregate([
        {
          $match: { $or: [{ member: { $in: [userId] } }, { ownerId: userId }] },
        },
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
        {
          $group: {
            _id: "$_id",
            name: { $first: "$name" },
            image: { $first: "$image" },
            ownerId: { $first: "$ownerId" },
            member: { $first: "$member" },
            channel: { $push: "$Channels" },
            createdAt: { $first: "$createdAt" },
          },
        },
      ])
      .sort({ createdAt: 1 })
      .toArray();
    const currentChannel = await getCurrentChannel(userId);

    return { server: servers, currentChannel: currentChannel };
  } catch (error) {
    throw new Error(error);
  }
};
const getCurrentChannel = async (id) => {
  try {
    const result = await getDB()
      .collection("Channel")
      .aggregate([{ $match: { inChat: { $in: [id] } } }])
      .toArray();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
const update = async (id, data) => {
  try {
    const updateData = { ...data, updatedAt: Date.now() };
    await getDB()
      .collection(userCollectionName)
      .findOneAndUpdate({ _id: ObjectId(id) }, { $set: updateData });
    return await findOneById(id);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  signUp,
  findOneById,
  validateSchema,
  login,
  getAllUser,
  listServerOfUser,
  update,
};
