import { productModel } from "../schemas/products.schema.js";

export const isProductExist = async (req, res, next) => {
    try {
        const product = await productModel.findById(req.params.id);

        req.product = product;
        next()
    } catch (e) {
        next(new Error("product is not exist"));
    }
}