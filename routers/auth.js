const express = require("express");
const authController = require("./../controller/auth");
const validate = require("../middleware/validate");

const { loginValidator } = require("./../validation/auth/login");
const { registerValidator } = require("../validation/auth/register");

const router = express.Router();

router
  .route("/register")
  .get(authController.showregisterPage)
  .post(validate(registerValidator, "/auth/register"), authController.register);
router
  .route("/login")
  .get(authController.showLoginPage)
  .post(validate(loginValidator, "/auth/login"), authController.login);

router.route("/users").get(authController.getUsers);
router.route("/accounts").get(authController.getAccounts);

module.exports = router;
