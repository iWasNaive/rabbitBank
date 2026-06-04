const { CreateTransaction } = require("../repositories/transaction");

exports.transaction = async (req, res) => {
  const sender_id = req.cookies.cardnumber;
  const { receiver_id, amount } = req.body;

  if (sender_id === receiver_id) {
    req.flash("error", "شما نمیتونی به خودت پول بزنی");
    return res.redirect("/");
  }

  const result = await CreateTransaction({ sender_id, receiver_id, amount });

  if (result === 401) {
    req.flash("error", "موجودی نداری");
    return res.redirect("/");
  } else if (result == 700) {
    req.flash("error", "شماره کارت اشتباس");
    return res.redirect("/");
  }

  req.flash("success", "انتقال وجه موفق");
  return res.redirect("/");
};
