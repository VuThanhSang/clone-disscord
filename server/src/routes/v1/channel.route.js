const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const channelController = require("../../controllers/channel.controller");

router.route("/create").post(verifyToken, channelController.create);
router.route("/join/:id").post(verifyToken, channelController.joinChannel);
router.route("/leave/:id").post(verifyToken, channelController.leaveChannel);
router
  .route("/getUserInChat/:id")
  .get(verifyToken, channelController.getUserInChat);
module.exports = router;
