import express, { Request, Response } from "express";

import { getUsers } from "../services/user.service.ts";
import { publishToken, login } from "../services/sign.service.ts";

export const signRouter = express.Router();

signRouter.get("/api/sign/login", async (req: Request, res: Response) => {
  console.log("req", req.body);
  const userId: string = req.body.userId;
  const userPwd: string = req.body.userPwd;

  try {
    const result: any = await login(userId, userPwd);
    if (result.rowCount > 0) {
      const tokenInfo = await publishToken(result.rows);

      res.status(200).send({
        success: true,
        result: { ...result.rows, tokenInfo },
      });
    } else {
      res.status(400).send({
        success: false,
        message: "Resource Null",
      });
    }
  } catch (err) {
    console.error("get /api/sign/login", err);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
});
