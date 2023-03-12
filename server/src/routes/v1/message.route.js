const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const messageController = require("../../controllers/message.controller");
const videoFileUploader = require("../../middlewares/videocloudinary");
const imageFileUploader = require("../../middlewares/imagecloudinary");
router
  .route("/sendMessage")
  .post(
    verifyToken,
    imageFileUploader.array("files"),
    messageController.sendMessage
  );
router
  .route("/sendVideo")
  .post(
    verifyToken,
    videoFileUploader.array("files"),
    messageController.sendMessage
  );

router
  .route("/removeSource/:id")
  .put(verifyToken, messageController.removeSource);

router
  .route("/deleteMessage/:id")
  .put(verifyToken, messageController.removeSource);
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
