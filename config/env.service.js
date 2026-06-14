import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

let port = process.env.PORT;
let mongoURL = process.env.MONGO_URL;
let userSignature = process.env.USER_SIGNATURE;
let saltRounds = process.env.SALT_ROUNDS;

export default port = {
  port,
  mongoURL,
  userSignature,
  saltRounds,
};
