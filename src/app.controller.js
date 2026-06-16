import dns from "node:dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import express from "express";
import { databaseConnection } from "./database/connection.js";
import env from "../config/env.service.js";
import authRouter from "./modules/auth/auth.controller.js";
import postRouter from "./modules/post/post.controller.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
export const bootstrap = () => {
  const app = express();
  app.use(express.json());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  databaseConnection();
  app.use("/auth", authRouter);
  app.use("/posts", postRouter);

  app.listen(env.port, () => {
    console.log("server started");
  });
};
