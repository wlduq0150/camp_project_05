import express from "express";
import User from "../models/users.model.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/user/info", isLoggedIn, async (req, res, next) => {
    
    const user = await User.findOne({
        where: { id: req.user },
        attributes: { exclude: ["id", "password"] }
    });

    return res.status(200).json({
        ok: true,
        message: "사용자 조회를 완료했습니다.",
        data: user
    });
});

export { router };