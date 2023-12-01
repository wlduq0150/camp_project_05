import { HttpException } from "../error/Http.exception.js";
import { ProductRepository } from "../repository/products.repository.js";

export class ProductService {

    productRepository = new ProductRepository

    findAllProducts = async (sort) => {
        const products = await this.productRepository.getAllProduct(sort);
    
        return {
            ok: true,
            message: "상품을 성공적으로 조회하였습니다.",
            data: products
        };
    }

    findProduct = async (id) => {
        const product = await this.productRepository.getProductById(id);

        return {
            ok: true,
            message: "상품을 성공적으로 조회하였습니다.",
            data: product
        };
    }

    createProduct = async (createProductData) => {
        const result = await this.productRepository.createProduct(createProductData);

        return {
            ok: true,
            message: "상품을 성공적으로 생성하였습니다.",
            data: result
        };
    }

    updateProduct = async (user, productId, updateProductData) => {
        const product = await this.productRepository.getProductById(productId);
        if (!product) {
            throw new HttpException(404, "상품 조회에 실패하셨습니다.");
        }

        if (user !== product.userId) {
            throw new HttpException(403, "상품의 소유자가 아닙니다.");
        }

        await this.productRepository.updateProduct(productId, updateProductData);

        return {
            ok: true,
            message: "상품을 성공적으로 수정하였습니다."
        };
    }

    deleteProduct = async (user, productId) => {
        const product = await this.productRepository.getProductById(productId);
        if (!product) {
            throw new HttpException(404, "상품 조회에 실패하셨습니다.");
        }

        if (user !== product.userId) {
            throw new HttpException(403, "상품의 소유자가 아닙니다.");
        }

        await this.productRepository.deleteProduct(productId);

        return {
            ok: true,
            message: `${productId} 상품이 성공적으로 삭제되었습니다.`
        };
    }

}