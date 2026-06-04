const {
  registerUserAndCreateAccount,
  loginUserAndFindCardnumber,
  findByUsername,
  findUsers,
} = require("../repositories/auth");
const { findAccounts } = require("../repositories/card");
const { GenerateCardNumber } = require("../utils/GenerateCardNumber");
const bcrypt = require("bcryptjs");

exports.showregisterPage = (req, res) => {
  res.render("register", { messages: req.flash() });
};

exports.register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    const cvv2 = Math.floor(Math.random() * 900) + 100;

    const hashedPass = await bcrypt.hash(password, 12);

    const cardNumber = GenerateCardNumber();

    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    const expireDate = date.toISOString().split("T")[0];

    const createUser = await registerUserAndCreateAccount({
      name,
      username,
      password: hashedPass,
      cvv2,
      cardNumber,
      expireDate,
    });

    res.cookie("cardnumber", createUser, {
      httpOnly: true,
    });

    req.flash("success", "ثبت نام موفق");
    return res.redirect("/");
  } catch (error) {
    req.flash("error", "نام کاربری از قبل وجود دارد");
    res.redirect("/auth/register");
  }
};

exports.showLoginPage = (req, res) => {
  res.render("login", { messages: req.flash() });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await findByUsername(username);

  if (!user) {
    req.flash("error", "نام کاربری یا رمز عبور اشتباست");
    return res.redirect("/auth/login");
  }

  const pass = await bcrypt.compare(password, user.password);

  if (!pass) {
    req.flash("error", "نام کاربری یا رمز عبور اشتباست");
    return res.redirect("/auth/login");
  }

  const cardNumber = await loginUserAndFindCardnumber(username);

  res.cookie("cardnumber", cardNumber, {
    httpOnly: true,
  });

  req.flash("success", "خوش آمدید");
  return res.redirect("/");
};

exports.getUsers = async (req, res) => {
  const result = await findUsers();
  return res.status(200).json({ users: result });
};

exports.getAccounts = async (req, res) => {
  const result = await findAccounts();
  return res.status(200).json({ users: result });
};
