import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

import { IData } from "./interface/data.interface";

dotenv.config();

const data: IData[] = [];

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send(data);
});

app.get("/:loadId", (req: Request, res: Response, next: NextFunction) => {
  res.send(data.find((data) => data.loanId == req.params.loadId));
});

app.post("/", (req: Request, res: Response, next: NextFunction) => {
  const loanExist = data.some((data) => data.loanId == req.body.loanId);
  if (!loanExist) data.push(req.body);
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
