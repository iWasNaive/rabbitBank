const db = require("./../db");

exports.findCardnumberByUserID = (user_id) => {};

exports.findUserByCardnumber = async (cardnumber) => {
  const connection = await db.getConnection();

  const query = "select * from accounts where cardnuber = ?";

  const [account] = await connection.execute(query, [cardnumber]);

  const findQuery = "select * from users where id = ?";

  const [user] = await connection.execute(findQuery, [account[0].user_id]);

  return user[0];
};

exports.findAccounts = async () => {
  const connection = await db.getConnection();

  const query = "select * from accounts";

  const [result] = await connection.execute(query);

  return result;
};
