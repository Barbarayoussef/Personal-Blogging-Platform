import { Router } from "express";
import { registerUser } from "./auth.service.js";
import { validation } from "../../utils/validation.js";
import { registerSchema } from "./auth.validation.js";

let router = Router();
router.post("/register", validation(registerSchema), registerUser);

export default router;
