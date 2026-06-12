import mongoose from "mongoose";

export const databaseConnection = async () => {
  mongoose
    .connect("mongodb://localhost:27017/personal-blogging-platform")
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log(error);
    });
};
