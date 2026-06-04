const app = require("./app");
const db = require("./db");

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("DB run");
    connection.release();

    app.listen(4000, () => {
      console.log("Server Run");
    });
  } catch (error) {
    console.log("Enternal Error =>", error.message);
  }
})();
