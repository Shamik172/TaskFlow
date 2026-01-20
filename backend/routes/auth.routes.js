import express from "express";
import { register, login, logout, me } from "../controllers/auth.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema,loginSchema } from "../validations/auth.validation.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/me", authMiddleware, me);

export default router;
