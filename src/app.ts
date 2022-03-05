import express, { Application, Request, Response, NextFunction } from "express";
import radio_list from "../data/radio_list.json";
import { MPC } from "mpc-js";

const app: Application = express();

const mpc = new MPC();
mpc.connectTCP("localhost", 6600);
mpc.currentPlaylist.clear();

radio_list.forEach((item) => {
  mpc.currentPlaylist.add(item.url);
});

app.use(express.static("public"));
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction): void => {
  res.send("hello from raspberry tada");
});

app.get("/current", (req: Request, res: Response, next: NextFunction): void => {
  res.json(radio_list[2]);
});

app.post("/play", (req: Request, res: Response, next: NextFunction): void => {
  console.log(req.body.station);

  let index = radio_list.findIndex((item) => {
    return item.station === req.body.station;
  });

  console.log(index);

  if (index >= 0) {
    mpc.playback.play(index);
  }

  res.json(index);
});

app.get("/list", (req: Request, res: Response, next: NextFunction): void => {
  res.json(radio_list);
});

app.listen(5000, () => {
  console.log("server running");
});
