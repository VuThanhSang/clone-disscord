const { HttpStatusCode } = require("../utilities/constants");
const userService = require("../services/user.service");

const listServerOfUser = async (req, res) => {
  try {
    const result = await userService.listServerOfUser(req.user.sub);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
const update = async (req, res) => {
  try {
    const result = await userService.update(req.user.sub, req);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
module.exports = {
  listServerOfUser,
  update,
};
