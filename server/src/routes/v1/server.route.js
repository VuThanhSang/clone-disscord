const express = require("express");
const verifyToken = require("../../middlewares/verifyToken");
const router = express.Router();
const serverController = require("../../controllers/server.controller");

router.route("/create").post(verifyToken, serverController.create);
router.route("/addMember").post(verifyToken, serverController.addMember);
module.exports = router;
