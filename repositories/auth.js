const db = require("../db");

exports.registerUserAndCreateAccount = async ({
  name,
  username,
  password,
  cvv2,
  cardNumber,
  expireDate,
}) => {
  const connection = await db.getConnection();

  await connection.beginTransaction();
  try {
    const query = "INSERT INTO users VALUES (? ,?, ?, ?)";

    const [createUser] = await connection.execute(query, [
      null,
      name,
      username,
      password,
    ]);

    const createAccountQuery =
      "INSERT INTO `accounts`(id,`user_id`, `cvv2`, `cardnuber`, `date`) VALUES (?, ?, ?, ?, ?)";
    const [createAccount] = await connection.execute(createAccountQuery, [
      null,
      createUser.insertId,
      cvv2,
      cardNumber,
      expireDate,
    ]);

    const FindCardNumberQuery =
      "select cardnuber from accounts where user_id = ?";
    const [newcardNumber] = await connection.execute(FindCardNumberQuery, [
      createUser.insertId,
    ]);

    await connection.commit();

    let userCard = newcardNumber[0].cardnuber;
    return userCard;
  } catch (error) {
    await connection.rollback();
    if (error.code === "ER_DUP_ENTRY") {
      if (error.message.includes("username")) {
        throw new Error("خطای داپلیکیت");
      }
    }
    throw error;
  } finally {
    connection.release();
  }
};

exports.findByUsername = async (username) => {
  const connection = await db.getConnection();
  try {
    const findQuery = "select * from users where username = ?";
    const [user] = await connection.execute(findQuery, [username]);

    return user[0];
  } catch (err) {
    throw err;
  } finally {
    connection.release();
  }
};

exports.findUsers = async () => {
  const connection = await db.getConnection();

  const query = "select * from users";
  const [users] = await connection.execute(query);

  return users;
};

exports.loginUserAndFindCardnumber = async (username) => {
  const connection = await db.getConnection();
  try {
    const findQuery = "select * from users where username = ?";

    const [user] = await connection.execute(findQuery, [username]);

    const cardnumberQuery = "select * from accounts where user_id = ?";

    const [account] = await connection.execute(cardnumberQuery, [user[0].id]);

    return account[0].cardnuber;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};
