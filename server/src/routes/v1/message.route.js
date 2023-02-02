const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const messageController = require("../../controllers/message.controller");

router.route("/sendMessage").post(verifyToken, messageController.sendMessage);

router
  .route("/editMessage/:id")
  .put(verifyToken, messageController.editMessage);

router
  .route("/showDirectMessage/:id")
  .get(verifyToken, messageController.showDirectMessage);

router
  .route("/showChannelMessage/:id")
  .get(verifyToken, messageController.showChannelMessage);
module.exports = router;
