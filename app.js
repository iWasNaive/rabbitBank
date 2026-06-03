const express = require("express");

const mainPageRoute = require("./routers/mainPage");
const authRoute = require("./routers/auth");
const transactionRoute = require("./routers/transaction");

const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/", mainPageRoute);
app.use("/auth", authRoute);
app.use("/transaction", transactionRoute);

module.exports = app;
