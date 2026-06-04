const { findAccounts } = require("../repositories/card");
const { receivSum, sendSum } = require("../repositories/mainPage");
const { lastTransActions } = require("../repositories/transaction");

exports.showMainPage = async (req, res) => {
  try {
    const user = req.user;

    const cardnumber = req.cookies.cardnumber;
    const account = await findAccounts(cardnumber);

    const receive = await receivSum(cardnumber);

    const send = await sendSum(cardnumber);

    const lastTransaction = await lastTransActions(account.id);

    const receiveSumValue = receive?.receivesum ?? 0;
    const sendSumValue = send?.sendsum ?? 0;

    return res.render("index", {
      messages: req.flash(),
      user,
      account,
      receive: { receivesum: receiveSumValue },
      send: { sendsum: sendSumValue },
      lastTransaction,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};
