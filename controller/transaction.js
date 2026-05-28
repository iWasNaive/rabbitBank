const { CreateTransaction } = require("../repositories/transaction");

exports.transaction = async (req, res) => {
  const sender_id = req.cookies.cardnumber;
  const { receiver_id, amount } = req.body;

  if (sender_id === receiver_id) {
    return res.json({ msg: "شما نمیتونی به خودت پول بزنی" });
  }

  const result = await CreateTransaction({ sender_id, receiver_id, amount });

  if (result === 401) {
    return res.json({ msg: "موجودی نداری" });
  }

  return res.json({ msg: "انتقال موفق" });
};
