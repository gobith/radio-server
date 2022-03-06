import express, { Application, Request, Response, NextFunction } from "express";
import radio_list from "../data/radio_list.json";
import { MPC } from "mpc-js";

const app: Application = express();
app.use(express.static("public"));
app.use(express.json());

const mpc = new MPC();
let playing: boolean = false;
let index: number;
mpc.connectTCP("localhost", 6600);
mpc.currentPlaylist.clear();
radio_list.forEach((item) => {
  mpc.currentPlaylist.add(item.url);
});

const display = () => {
  let status = "OFF";
  if (playing) {
    status = "ON";
  }
  if (index) {
    return { ...radio_list[index], status: status };
  } else {
    return { station: "NONE", status: status };
  }
};

const ensure_play = () => {
  if (index) {
    if (playing) {
      mpc.playback.play(index);
    } else {
      mpc.playback.stop();
    }
  } else {
    mpc.playback.stop();
  }
};

app.get("/display", (req: Request, res: Response, next: NextFunction): void => {
  res.json(display());
});

app.get("/list", (req: Request, res: Response, next: NextFunction): void => {
  res.json(radio_list);
});

app.listen(5000, () => {
  console.log("server running on 5000");
});

app.post(
  "/change_station",
  (req: Request, res: Response, next: NextFunction): void => {
    index = radio_list.findIndex((item) => {
      return item.station === req.body.station;
    });
    ensure_play();
    res.json(display());
  }
);

app.post("/play", (req: Request, res: Response, next: NextFunction): void => {
  playing = true;
  ensure_play();
  res.json(display());
});

app.post("/stop", (req: Request, res: Response, next: NextFunction): void => {
  playing = false;
  ensure_play();
  res.json(display());
});

app.post("/prev", (req: Request, res: Response, next: NextFunction): void => {
  if (index > 0) {
    index = index - 1;
  } else {
    index = radio_list.length;
  }
  ensure_play();
  res.json(display());
});

app.post("/next", (req: Request, res: Response, next: NextFunction): void => {
  if (index === radio_list.length) {
    index = 1;
  } else {
    index = index + 1;
  }
  ensure_play();
  res.json(display());
});
