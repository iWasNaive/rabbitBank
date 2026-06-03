const db = require("./../db");

exports.findCardnumberByUserID = (user_id) => {};

exports.findUserByCardnumber = async (cardnumber) => {
  const connection = await db.getConnection();
  try {
    const query = "select * from accounts where cardnuber = ?";

    const [account] = await connection.execute(query, [cardnumber]);

    const findQuery = "select * from users where id = ?";

    const [user] = await connection.execute(findQuery, [account[0].user_id]);

    return user[0];
  } finally {
    connection.release();
  }
};

exports.findAccounts = async (cardnumber) => {
  const connection = await db.getConnection();
  try {
    const query = "select * from accounts where cardnuber = ?";

    const [result] = await connection.execute(query, [cardnumber]);

    return result[0];
  } finally {
    connection.release();
  }
};
