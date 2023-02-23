const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const userController = require("../../controllers/user.controller");

router
  .route("/listServerOfUser")
  .get(verifyToken, userController.listServerOfUser);

module.exports = router;
