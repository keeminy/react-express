import express, { Request, Response } from "express";

import { getUsers, login } from "../services/user.service.ts";

export const userRouter = express.Router();

userRouter.get("/api/sign/login", async (req: Request, res: Response) => {
  console.log("req", req.body);
  const userId: string = req.body.userId;
  const userPwd: string = req.body.userPwd;

  try {
    const result: any = await login(userId, userPwd);
    if (result.rowCount > 0) {
      res.status(200).send({
        success: true,
        result: result.rows,
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

userRouter.get("/api/users", async (req: Request, res: Response) => {
  try {
    const result: any = await getUsers();
    if (result.rowCount > 0) {
      res.status(200).send({
        success: true,
        result: result.rows,
      });
    }
  } catch (err) {
    console.error("get /api/users", err);
    res.status(500).send({
      success: false,
      message: "Server Error",
    });
  }
});
