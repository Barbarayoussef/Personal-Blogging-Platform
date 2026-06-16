import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync("./config/.env")) {
  dotenv.config({ path: "./config/.env" });
}

let port = process.env.PORT;
let mongoURL = process.env.MONGO_URL;
let userSignature = process.env.USER_SIGNATURE;
let saltRounds = Number(process.env.SALT_ROUNDS) || 10;

export default {
  port,
  mongoURL,
  userSignature,
  saltRounds,
};
