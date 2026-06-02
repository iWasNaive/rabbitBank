const express = require("express");
const controller = require("./../controller/transaction");
const { authMid } = require("../middleware/authGaurd");
const router = express.Router();

router.route("/send").post(authMid, controller.transaction);

module.exports = router;
