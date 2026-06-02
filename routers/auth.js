const express = require("express");
const authController = require("./../controller/auth");

const router = express.Router();

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router.route("/users").get(authController.getUsers);
router.route("/accounts").get(authController.getAccounts);

module.exports = router;
