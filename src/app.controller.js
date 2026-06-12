import express from "express";
import { databaseConnection } from "./database/connection.js";

export const bootstrap = () => {
  const app = express();
  app.use(express.json());
  databaseConnection();

  app.listen(3000, () => {
    console.log("server started");
  });
};
