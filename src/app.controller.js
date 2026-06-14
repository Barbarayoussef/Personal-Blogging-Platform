import express from "express";
import { databaseConnection } from "./database/connection.js";
import env from "../config/env.service.js";
import authRouter from "./modules/auth/auth.controller.js";

export const bootstrap = () => {
  const app = express();
  app.use(express.json());
  databaseConnection();
  app.use("/auth", authRouter);

  app.listen(env.port, () => {
    console.log("server started");
  });
};
