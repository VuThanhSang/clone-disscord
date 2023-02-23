const serverModel = require("../models/server.model");

const create = async (ownerId, data) => {
  try {
    const addValue = { ...data, ownerId: ownerId, member: [ownerId] };
    const result = await serverModel.create(addValue);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const addMember = async (data) => {
  try {
    const result = await serverModel.addMember(data.id, data.memberId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  create,
  addMember,
};
