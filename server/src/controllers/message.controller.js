const { HttpStatusCode } = require("../utilities/constants");
const messageService = require("../services/message.service");

const sendMessage = async (req, res) => {
  try {
    const result = await messageService.sendMessage(req);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const editMessage = async (req, res) => {
  try {
    const result = await messageService.editMessage(req.params.id, req.body);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const showChannelMessage = async (req, res) => {
  try {
    const result = await messageService.showChannelMessage(
      req.params.id,
      req.query.paging
    );
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const showDirectMessage = async (req, res) => {
  try {
    const result = await messageService.showDirectMessage(req.body);
    res.status(HttpStatusCode.OK).json({ result: result });
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};

const removeSource = async (req, res) => {
  try {
    const result = await messageService.removeSource(
      req.params.id,
      req.user.sub
    );
    if (result.status === true) {
      res.status(HttpStatusCode.OK).json({ result: result });
    } else {
      res.status(401).json({ result: result });
    }
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
const deleteMessage = async (req, res) => {
  try {
    const result = await messageService.removeSource(
      req.params.id,
      req.user.sub
    );
    if (result.status === true) {
      res.status(HttpStatusCode.OK).json({ result: result });
    } else {
      res.status(401).json({ result: result });
    }
  } catch (error) {
    res.status(HttpStatusCode.INTERNAL_SERVER).json({
      error: new Error(error).message,
    });
  }
};
module.exports = {
  sendMessage,
  editMessage,
  showDirectMessage,
  showChannelMessage,
  removeSource,
  deleteMessage,
};
