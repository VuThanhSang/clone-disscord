const { HttpStatusCode } = require("../utilities/constants");
const channelService = require("../services/channel.service");

const create = async (req, res) => {
  try {
    const result = await channelService.create(req.body);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const joinChannel = async (req, res) => {
  try {
    const result = await channelService.joinChannel(
      req.params.id,
      req.user.sub
    );
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const leaveChannel = async (req, res) => {
  try {
    const result = await channelService.leaveChannel(
      req.params.id,
      req.user.sub
    );
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

module.exports = {
  create,
  joinChannel,
  leaveChannel,
};
