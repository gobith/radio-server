import express, { Application, Request, Response, NextFunction } from "express";
import radio_list from "../data/radio_list.json";

const app: Application = express();

app.use(express.static('public'));
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.send("hello from raspberry tada");
});

app.get("/list", (req: Request, res: Response, next: NextFunction): void => {
  res.json(radio_list);
});

app.listen(6000, () => {
  console.log("server running");
});
