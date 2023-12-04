import { PrismaClient } from "@prisma/client";

export class ProductRepository {

    db = new PrismaClient({
        log: ["query", "info", "warn", "error"],
        errorFormat: "pretty"
    });

    getAllProduct = async (sort) => {
        const products = await this.db.products.findMany({
            include: {
                users: {
                    select: { name: true }
                }
            },
            orderBy: {
                createdAt: sort.toLowerCase(),
            }
        });
        return products;
    }

    getProductById = async (id) => {
        const product = await this.db.products.findFirst({
            where: {
                id: +id
            },
            include: {
                users: {
                    select: { name: true }
                }
            }
        });
        return product;
    }

    createProduct = async (createProductData) => {
        const result = await this.db.products.create({
            data: createProductData
        });
        return result;
    }

    updateProduct = async (id, updateProductData) => {
        const result = await this.db.products.update({
            data: { ...updateProductData },
            where: { id: +id }
        });
        return result;
    }

    deleteProduct = async (id) => {
        const result = await this.db.products.delete({
            where: { id: +id }
        });
        return result;
    }

}