import { ProductService } from "../services/products.service.js";


export class ProductController {

    productService = new ProductService();

    findAllProducts = async (req, res, next) => {
        try {
            let sort = req.query.sort ? req.query.sort.toUpperCase() : "DESC";
            sort = ["ASC", "DESC"].includes(sort) ? sort : "DESC";

            const result = await this.productService.findAllProducts(sort);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

    findProduct = async (req, res, next) => {
        try {
            const result = await this.productService.findProduct(req.params.id);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

    createProduct = async (req, res, next) => {
        try {
            const result = await this.productService.createProduct(req.createProductData);
            return res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    updateProduct = async (req, res, next) => {
        try {
            const result = await this.productService.updateProduct(
                req.user,
                req.params.id,
                req.updateProductData
            );
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

    deleteProduct = async (req, res, next) => {
        try {
            const result = await this.productService.deleteProduct(req.user, req.params.id);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

}