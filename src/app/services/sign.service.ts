import jwt from "../jwt/jwt-util.ts";
import { signSql } from "../sql/sign.sql.ts";
import { connection } from "../config/connection.ts";

export const publishToken = async (user: any) => {
  const accessToken = jwt.sign(user);
  const refreshToken = jwt.refresh();

  //redisClient.set(user.id, refreshToken);
  return { accessToken, refreshToken };
};

export const login = async (userId: string, userPwd: string) => {
  const postdb = await connection.connect();
  const params = [userId, userPwd];
  try {
    return new Promise((resolve, rejects) => {
      postdb.query(signSql, params, (err, res) => {
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
