const userModel = require("../models/user.model");

const listServerOfUser = async (userId) => {
  try {
    const result = await userModel.listServerOfUser(userId);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const update = async (id, data) => {
  try {
    let updateData = { ...data.body };
    if (data.file) {
      const avatar = {
        data: data.file.path,
        type: data.file.mimetype,
        filename: data.file.filename,
      };
      updateData = { ...data.body, avatar };
    }
    const result = await userModel.update(id, updateData);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
module.exports = {
  listServerOfUser,
  update,
};
