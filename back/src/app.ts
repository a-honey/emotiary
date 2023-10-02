import express, { Express, Request, Response } from "express";
import cors from 'cors';

const app: Express = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
    res.send("기본 페이지");
  });


  export { app };