import { connection } from "../config/connection.ts";

export const getUsers = async () => {
  const conn = await connection.connect();
  const sql = "select * from wcs_standard.md_user";

  try {
    return new Promise((resolve, rejects) => {
      conn.query(sql, (err, res) => {
        if (err) {
          rejects(err);
        }
        resolve(res);
      });
    });
  } finally {
    conn.release();
  }
};

export const transTest = async () => {
  const conn = await connection.connect();

  try {
    await conn.query("BEGIN");

    await conn.query(
      "insert into wcs_standard.md_user ( user_id, user_password) values ( 'test1', 'test1' );"
    );

    await conn.query(
      "insert into wcs_standard.md_user ( user_id, user_pwd) values ( 'test2', 'test2' );"
    );

    await conn.query("COMMIT");
  } catch (err) {
    await conn.query("ROLLBACK");
    console.log("ERR", err);
  } finally {
    conn.release();
  }
};
