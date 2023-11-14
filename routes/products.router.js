import express from "express";
import Product from "../models/products.model.js";
import User from "../models/users.model.js";

import { verifyCreateProduct } from "../middlewares/verify.middleware.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";


const router = express.Router();

// 상품 목록 조회
router.get("/products", async (req, res, next) => {
    let sort = req.query.sort ? req.query.sort.toUpperCase() : "DESC";
    sort = ["ASC", "DESC"].includes(sort) ? sort : "DESC";

    const products = await Product.findAll({
        include: [
            { model: User, as: "user", attributes: ["name"] }
        ],
        order: [
            ["createdAt", sort]
        ]
    });

    return res.status(200).json(products);
});

// 상품 상세 조회
router.get("/products/:id", async (req, res, next) => {
    const product = await Product.findOne({
        where: { id: req.params.id },
        include: [
            { model: User, as: "user", attributes: ["name"] }
        ]
    });

    return res.status(200).json(product);
});

// 상품 생성
router.post("/products", isLoggedIn, verifyCreateProduct, async (req, res, next) => {
    const { createData } = req;

    try {
        await Product.create(createData);
        return res.status(200).json(createData);
    } catch (e) {
        next(e);
    }
});

// 상품 수정
router.patch("/products/:id", isLoggedIn, async (req, res, next) => {
    const id = req.params.id;
    const updateData = req.body;

    const product = await Product.findOne({ where: { id } });

    // 상품 확인
    if (!product) {
        return res.status(404).json({
            ok: false,
            message: "상품 조회에 실패하셨습니다."
        });
    }

    // 사용자 아이디 체크
    if (req.user !== product.userId) {
        return res.status(403).json({
            ok: false,
            message: "상품의 소유자가 아닙니다."
        });
    }

    try {
        const product = await Product.update(updateData, { where: { id } });
        return res.status(200).json({
            ok: true,
            message: "상품을 성공적으로 수정하였습니다."
        });
    } catch (e) {
        next(e);
    }
});

// 상품 삭제
router.delete("/products/:id", isLoggedIn, async (req, res, next) => {
    const id = req.params.id;

    const product = await Product.findOne({ where: { id } });

    // 상품 확인
    if (!product) {
        return res.status(404).json({
            ok: false,
            message: "상품 조회에 실패하셨습니다."
        });
    }

    // 사용자 아이디 체크
    if (req.user !== product.userId) {
        return res.status(403).json({
            ok: false,
            message: "상품의 소유자가 아닙니다."
        });
    }

    try {
        await Product.destroy({ where: { id } });
        return res.status(200).json({
            ok: true,
            message: `${id} 상품이 성공적으로 삭제되었습니다.`
        });
    } catch (e) {
        next(e);
    }
});

export { router };
