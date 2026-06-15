import userModel from "../../database/models/user.model.js";
import bcrypt from "bcrypt";
import env from "../../../config/env.service.js";
import { generateBothTokens } from "../../middleware/authenticate.js";

export const registerUser = async (req, res) => {
  try {
    let { name, email, password, confirmPassword } = req.body;
    let emailExist = await userModel.findOne({ email });
    if (emailExist) {
      return res.status(400).json({ message: "email already exist" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "passwords do not match" });
    }
    let hashedPassword = await bcrypt.hash(password, Number(env.saltRounds));
    let newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    let existedUser = await userModel.findOne({ email });
    if (!existedUser) {
      return res.status(404).json({ message: "email not found" });
    }
    let checkPassword = await bcrypt.compare(password, existedUser.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "invalid password" });
    }
    let { accessToken, refreshToken } = generateBothTokens(existedUser);
    return res.status(200).json({
      message: "login successful",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
