import express from "express";
import User from "../models/users.model.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { UserController } from "../controllers/users.controller.js";

const router = express.Router();

const userController = new UserController();

router.get("/user/info", isLoggedIn, userController.findUser);

export { router };