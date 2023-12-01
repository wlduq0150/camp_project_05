import db from "../models/index.js";
import User from "../models/users.model.js";

export class ProductRepository {

    getAllProduct = async (sort) => {
        const products = await db.Product.findAll({
            include: [
                { model: User, as: "user", attributes: ["name"] }
            ],
            order: [
                ["createdAt", sort]
            ]
        });
        return products;
    }

    getProductById = async (id) => {
        const product = await db.Product.findOne({
            where: { id },
            include: [
                { model: User, as: "user", attributes: ["name"] }
            ]
        });
        return product;
    }

    createProduct = async (createProductData) => {
        const result = await db.Product.create(createProductData);
        return result;
    }

    updateProduct = async (id, updateProductData) => {
        const result = await db.Product.update({
            ...updateProductData
        }, {
            where: { id }
        });
        return result;
    }

    deleteProduct = async (id) => {
        const result = await db.Product.destroy({
            where: { id }
        });
        return result;
    }

}