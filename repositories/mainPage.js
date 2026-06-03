const db = require("./../db");

exports.receivSum = async (cardnumber) => {
  const connection = await db.getConnection();
  try {
    const query =
      "select sum(amount) as receivesum from transactions join accounts on receiver_id = accounts.id where cardnuber = ? and created_at >= curdate() and created_at < curdate() + interval 1 day";

    const [result] = await connection.execute(query, [cardnumber]);

    return result[0];
  } finally {
    connection.release();
  }
};

exports.sendSum = async (cardnumber) => {
  const connection = await db.getConnection();
  try {

    const query =
      "select sum(amount) as sendsum from transactions join accounts on sender_id = accounts.id where cardnuber = ? and created_at >= curdate() and created_at < curdate() + interval 1 day";

    const [result] = await connection.execute(query, [cardnumber]);

    return result[0];
  } finally {
    connection.release();
  }
};
