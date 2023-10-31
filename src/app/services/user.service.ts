import { connection } from "../config/connection.ts";

export const login = async (userId: string, userPwd: string) => {
  const postdb = await connection.connect();
  const search_User_SQL =
    "select * from wcs_standard.md_user where user_id = $1 and user_password = $2";
  const params = [userId, userPwd];
  try {
    return new Promise((resolve, rejects) => {
      postdb.query(search_User_SQL, params, (err, res) => {
        if (err) {
          rejects(err);
        }
        resolve(res);
      });
    });
  } finally {
    postdb.release();
  }
};

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
