const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const channelController = require("../../controllers/channel.controller");

router.route("/create").post(verifyToken, channelController.create);
router.route("/join").post(verifyToken, channelController.joinChannel);
router.route("/leave").post(verifyToken, channelController.leaveChannel);
module.exports = router;
