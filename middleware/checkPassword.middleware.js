import { productModel } from "../schemas/products.schema.js";

export const checkPassword = async (req, res, next) => {
    try {
        const { password } = req.updateData;
        const originPassword = (await productModel.findById(req.params.id, "password")).password;

        if (!password || password !== originPassword) {
            console.log(password);
            console.log(originPassword);
            next(new Error("product password is wrong"));
        }

        next();
    } catch (e) {
        next(new Error("product is not exist"));
    }
}