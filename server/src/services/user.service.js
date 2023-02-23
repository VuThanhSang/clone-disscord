const userModel = require("../models/user.model");

const listServerOfUser = async (userId) => {
  try {
    const result = await userModel.listServerOfUser(userId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  listServerOfUser,
};
