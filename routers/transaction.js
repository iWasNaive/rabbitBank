const express = require("express");
const controller = require("./../controller/transaction");
const router = express.Router();

router.route("/send").post(controller.transaction);

module.exports = router;
