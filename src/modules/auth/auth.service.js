import userModel from "../../database/models/user.model.js";
import bcrypt from "bcrypt";
import env from "../../../config/env.service.js";
import { generateBothTokens } from "../../middleware/authenticate.js";

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password, confirmPassword]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Barbara Youssef
 *               email:
 *                 type: string
 *                 example: barbara@example.com
 *               password:
 *                 type: string
 *                 example: Password1
 *               confirmPassword:
 *                 type: string
 *                 example: Password1
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Email already exists or passwords do not match
 *       500:
 *         description: Internal Server Error
 */
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
    console.error("DEBUG ERROR:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and receive JWT tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: barbara@example.com
 *               password:
 *                 type: string
 *                 example: Password1
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       400:
 *         description: Invalid password
 *       404:
 *         description: Email not found
 *       500:
 *         description: Internal Server Error
 */
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
    console.error("DEBUG ERROR:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
