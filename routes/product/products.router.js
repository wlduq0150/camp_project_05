import express from "express";
import { productModel } from "../../schemas/products.schema.js";

import { existMiddleware } from "./middleware/isExist.middleware.js";
import { registerMiddleware } from "./middleware/regitster.middleware.js";
import { updateMiddleware } from "./middleware/update.middleware.js";
import { checkPasswordMiddleware } from "./middleware/checkPassword.middleware.js";

const router = express.Router();

// 상품 목록 조회
router.get("/list", async (req, res, next) => {
    const products = await productModel.find({}, "id_ name owner state createdAt");

    products.sort((a, b) => {
        new Date(a.createdAt) - new Date(b.createdAt);
    });

    return res.status(200).json(products);
});

// 상품 상세 조회
router.get("/detail/:id", existMiddleware, (req, res, next) => {
    return res.status(200).json(req.product);
});

// 상품 작성
router.post("/register", registerMiddleware, async (req, res, next) => {
    const { registerData } = req;

    try {
        await productModel.create(registerData);
        return res.status(200).json(registerData);
    } catch (e) {
        next(e);
    }
});

// 상품 수정
router.patch(
    "/update/:id",
    existMiddleware,
    updateMiddleware,
    checkPasswordMiddleware,
    async (req, res, next) => {
        const _id = req.params.id;
        const { updateData } = req;

        try {
            const product = await productModel.updateOne({ _id }, updateData);
            return res.status(200).json(product);
        } catch (e) {
            next(e);
        }
    }
);

// 상품 삭제
router.delete("/delete/:id", existMiddleware, async (req, res, next) => {
    const _id = req.params.id;

    try {
        await productModel.deleteOne({ _id });
        return res.status(200).send(`product ${_id} is removed`);
    } catch (e) {
        next(e);
    }
});

export { router };
