import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";

import { userRouter } from "./controller/user.controller.ts";

const __dirname = path.resolve();

// TODO : PORT 환경변수
const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "dist/")));

app.use(userRouter);

// simple route
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
