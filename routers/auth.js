const express = require("express");
const authController = require("./../controller/auth");

const router = express.Router();

router
  .route("/register")
  .get(authController.showregisterPage)
  .post(authController.register);
router
  .route("/login")
  .get(authController.showLoginPage)
  .post(authController.login);

router.route("/users").get(authController.getUsers);
router.route("/accounts").get(authController.getAccounts);

module.exports = router;
