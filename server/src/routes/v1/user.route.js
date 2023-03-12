const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const userController = require("../../controllers/user.controller");
const imageFileUploader = require("../../middlewares/imagecloudinary");
router
  .route("/listServerOfUser")
  .get(verifyToken, userController.listServerOfUser);
router
  .route("/update")
  .put(verifyToken, imageFileUploader.single("file"), userController.update);
module.exports = router;
