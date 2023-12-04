import express from "express";
import { verifyLoginData, verifyRegisterData } from "../middlewares/verify.middleware.js";
import { AuthController } from "../controllers/auth.controller.js";

const router = express.Router();

const authController = new AuthController();

// 회원가입 api
router.post("/auth/register", verifyRegisterData, authController.register);
// 로그인 api
router.post("/auth/login", verifyLoginData, authController.login);

export { router };