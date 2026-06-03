const express = require("express");
const controller = require("./../controller/mainPage");
const { authMid } = require("../middleware/authGaurd");

const router = express.Router();

router.route("/").get(authMid, controller.showMainPage);

module.exports = router;
