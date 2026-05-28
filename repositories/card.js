const db = require("./../db");

exports.findCardnumberByUserID = (user_id) => {};

exports.findAccounts = async () => {
  const connection = await db.getConnection();

  const query = "select * from accounts";

  const [result] = await connection.execute(query);

  return result;
};
