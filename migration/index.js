const fs = require("fs");
const path = require("path");
const db = require("./../db");

const run = async () => {
  const usersTable = fs.readFileSync(
    path.resolve(__dirname, "users-ddl.sql"),
    "utf-8",
  );

  const accountsTable = fs.readFileSync(
    path.resolve(__dirname, "accounts-ddl.sql"),
    "utf-8",
  );

  const transactionsTable = fs.readFileSync(
    path.resolve(__dirname, "transactions-ddl.sql"),
    "utf-8",
  );

  const connection = await db.getConnection();

  await connection.beginTransaction();
  try {
    await connection.execute(usersTable);
    await connection.execute(accountsTable);
    await connection.execute(transactionsTable);
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  }
};

(async () => {
  try {
    await run();
    console.log("migrate Successfully");
  } catch (error) {
    throw error;
  }
})();
