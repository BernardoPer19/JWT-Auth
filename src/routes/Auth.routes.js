import { Router } from "express";
import { registerUser } from "../controllers/AuthController.controller.js";

export const AuthRouter = Router();

AuthRouter.post("/register", registerUser);
