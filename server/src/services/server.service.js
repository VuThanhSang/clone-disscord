const serverModel = require("../models/server.model");

const create = async (data) => {
  try {
    data.Member = [data.Owner];
    const result = await serverModel.create(data);
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
