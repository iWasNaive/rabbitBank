const express = require("express");
const authRoute = require("./routers/auth");
const transactionRoute = require("./routers/transaction");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoute);
app.use("/transaction", transactionRoute);

app.get("/", (req, res) => {
  res.render("index");
});

module.exports = app;
