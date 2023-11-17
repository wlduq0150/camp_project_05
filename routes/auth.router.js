import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/users.model.js";
import { verifyRegisterData } from "../middlewares/verify.middleware.js";

const router = express.Router();

// 회원가입 api
router.post("/auth/register", verifyRegisterData, async (req, res, next) => {
    const { email, name, sex, password } = req.registerData;

    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
        return res.status(409).send({
            ok: false,
            message: "이미 가입 된 이메일입니다."
        });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // 유저 생성
    await User.create({
        email,
        name,
        sex,
        password: hashPassword
    });

    // 비밀번호를 제외한 정보 반환
    return res.status(201).json({
        ok: true,
        message: "회원가입에 성공했습니다.",
        data: {
            email,
            name,
            sex
        }
    });
});

// 로그인 api
router.post("/auth/login", async (req, res, next) => {
    const { email, password } = req.body;

    const exUser = await User.findOne({ where: { email } });
    if (!exUser) {
        return res.status(401).send({
            ok: false,
            message: "존재하지 않는 이메일입니다."
        });
    }

    const compare = await bcrypt.compare(password, exUser.password);

    if (!compare) {
        return res.status(401).send({
            ok: false,
            message: "비밀번호가 틀렸습니다."
        });
    }

    const token = jwt.sign({ userId: exUser.id }, process.env.JWT_SECRET, { expiresIn: "12h" });

    return res.status(200).json({
        ok: true,
        message: "회원가입에 성공했습니다.",
        data: { accessToken: token }
    });
});

export { router };