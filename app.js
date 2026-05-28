const express = require("express");
const authRoute = require("./routers/auth");
const transactionRoute = require("./routers/transaction");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/transaction", transactionRoute);

module.exports = app;
