import express, { Request, Response } from "express";

import { getUsers, transTest } from "../services/user.service.ts";

export const userRouter = express.Router();

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

userRouter.post("/api/users", async (req: Request, res: Response) => {
  try {
    const result: any = await transTest();
    console.log("result", result);

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
