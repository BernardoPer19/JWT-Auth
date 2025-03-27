import { Router } from "express";
import {
  loginUser,
  protectedRoute,
  registerUser,
} from "../controllers/AuthController.controller.js";
import { authenticate } from "../middlewares/authoticate.js";  

export const AuthRouter = Router();

AuthRouter.post("/register", registerUser);
AuthRouter.post("/login", loginUser); 
AuthRouter.get("/protejido", authenticate, protectedRoute); 
