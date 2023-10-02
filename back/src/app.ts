import express, { Express, Request, Response } from "express";
import cors from 'cors';
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger/swagger-output.json";

const app: Express = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerFile, { explorer: true }),
);

app.get("/", (req: Request, res: Response) => {
    res.send("기본 페이지");
  });


  export { app };