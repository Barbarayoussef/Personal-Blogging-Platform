import { Router } from "express";
import { registerUser, loginUser } from "./auth.service.js";
import { validation } from "../../utils/validation.js";
import { registerSchema, loginSchema } from "./auth.validation.js";

let router = Router();
router.post("/register", validation(registerSchema), registerUser);
router.post("/login", validation(loginSchema), loginUser);

export default router;
