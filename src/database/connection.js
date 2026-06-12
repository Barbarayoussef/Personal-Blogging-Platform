import mongoose from "mongoose";
import env from "../../config/env.service.js";

export const databaseConnection = async () => {
  mongoose
    .connect(env.mongoURL)
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
