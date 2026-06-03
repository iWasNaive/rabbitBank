const { findAccounts } = require("../repositories/card");
const { receivSum, sendSum } = require("../repositories/mainPage");
const { lastTransActions } = require("../repositories/transaction");

exports.showMainPage = async (req, res) => {
  try {
    const user = req.user;

    const cardnumber = req.cookies.cardnumber;
    const account = await findAccounts(cardnumber);

    console.log("1");
    const receive = await receivSum(cardnumber);

    console.log("2");
    const send = await sendSum(cardnumber);

    console.log("3");
    const lastTransaction = await lastTransActions(account.id);

    const receiveSumValue = receive?.receivesum ?? 0;
    const sendSumValue = send?.sendsum ?? 0;

    console.log("4");
    return res.render("index", {
      user,
      account,
      receive: { receivesum: receiveSumValue },
      send: { sendsum: sendSumValue },
      lastTransaction,
    });
    console.log("after render");
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
