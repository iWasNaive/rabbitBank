const { findUserByCardnumber } = require("../repositories/card");

exports.authMid = async (req, res, next) => {
  try {
    const { cardnumber } = req.cookies;

    if (!cardnumber) {
      return res.json("باید لاگین کنید");
    }

    const user = await findUserByCardnumber(cardnumber);

    req.user = user;
    next();
  } catch (error) {
    throw error;
  }
};
