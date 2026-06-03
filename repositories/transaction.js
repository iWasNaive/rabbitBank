const db = require("./../db");

exports.CreateTransaction = async ({ sender_id, receiver_id, amount }) => {
  const connection = await db.getConnection();

  await connection.beginTransaction();
  try {
    const senderIDQuery = "select id from accounts where cardnuber = ?";
    const receiverIDQuery = "select id from accounts where cardnuber = ?";

    const [sender] = await connection.execute(senderIDQuery, [sender_id]);
    const [receiver] = await connection.execute(receiverIDQuery, [receiver_id]);

    if (receiver.length === 0) {
      return 700;
    }

    const subtractFromSender =
      "UPDATE `accounts` SET `balance`= balance - ? WHERE cardnuber = ? and balance >= ?";
    const [senderUpdateRow] = await connection.execute(subtractFromSender, [
      amount,
      sender_id,
      amount,
    ]);

    let balanceErr = 401;
    if (senderUpdateRow.affectedRows === 0) {
      return balanceErr;
    }

    const AddToRecipient =
      "UPDATE `accounts` SET `balance`= balance + ? WHERE cardnuber = ?";
    await connection.execute(AddToRecipient, [amount, receiver_id]);

    let status = "success";
    const referenceCode = Math.floor(1000 + Math.random() * 9999);
    const createTransactionTableQuery =
      "INSERT INTO transactions(id, sender_id, receiver_id, amount, status, referencecode) VALUES (?, ?, ?, ?, ?, ?)";
    await connection.execute(createTransactionTableQuery, [
      null,
      sender[0].id,
      receiver[0].id,
      amount,
      status,
      referenceCode,
    ]);

    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  }
};

exports.lastTransActions = async (cardID) => {
  const connection = await db.getConnection();
  try {
    const query =
      "select * from transactions where receiver_id = ? or sender_id = ? order by created_at desc limit 3";

    const [result] = await connection.execute(query, [cardID, cardID]);

    return result;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
};
