const { HttpStatusCode } = require("../utilities/constants");
const serverService = require("../services/server.service");

const create = async (req, res) => {
  try {
    const result = await serverService.create(req.user.sub, req.body);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const addMember = async (req, res) => {
  try {
    const result = await serverService.addMember(req.body);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

module.exports = {
  create,
  addMember,
};
