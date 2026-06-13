import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });

let port = process.env.PORT;
let mongoURL = process.env.MONGO_URL;
let userSignature = process.env.USER_SIGNATURE;

export default port = {
  port,
  mongoURL,
  userSignature,
};
