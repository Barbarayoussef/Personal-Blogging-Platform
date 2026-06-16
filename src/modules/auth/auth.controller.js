import { Router } from "express";
import { registerUser, loginUser } from "./auth.service.js";
import { validation } from "../../utils/validation.js";
import { registerSchema, loginSchema } from "./auth.validation.js";

let router = Router();
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
router.post("/register", validation(registerSchema), registerUser);

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
router.post("/login", validation(loginSchema), loginUser);

export default router;
