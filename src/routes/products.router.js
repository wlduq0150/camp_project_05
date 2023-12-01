import express from "express";
import { verifyCreateProductData, verifyUpdateProductData } from "../middlewares/verify.middleware.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { ProductController } from "../controllers/products.contoller.js";


const router = express.Router();

const productController = new ProductController();

// 상품 목록 조회
router.get("/products", productController.findAllProducts);

// 상품 상세 조회
router.get("/products/:id", productController.findProduct);

// 상품 생성
router.post("/products", isLoggedIn, verifyCreateProductData, productController.createProduct);

// 상품 수정
router.patch("/products/:id", isLoggedIn, verifyUpdateProductData, productController.updateProduct);

// 상품 삭제
router.delete("/products/:id", isLoggedIn, productController.deleteProduct);

export { router };
