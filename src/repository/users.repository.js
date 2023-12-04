// import db from "../models/index.js";

import { Prisma, PrismaClient } from "@prisma/client";

export class UserRepository {

    db = new PrismaClient({
        log: ["query", "info", "warn", "error"],
        errorFormat: "pretty"
    });

    getAllUser = async () => {
        const users = await this.db.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                createdAt: true,
                updatedAt: true
            }
        });
        return users;
    }

    getUserById = async (id) => {
        const user = await this.db.users.findFirst({
            where: { id: +id },
            select: {
                id: true,
                name: true,
                email: true,
                password: false,
                createdAt: true,
                updatedAt: true
            }
        });
        return user;
    }

    getUserByEmail = async (email) => {
        const user = await this.db.users.findFirst({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                createdAt: true,
                updatedAt: true
            }
        });
        return user;
    }

    createUser = async (createUserData) => {
        const { name, sex, email, password } = createUserData;
        const result = await this.db.users.create({
            data: {
                name,
                sex,
                email,
                password
            }
        }); 
        return result;
    }

    updateUser = async (id, updateUserData) => {
        const result = await this.db.users.update({
            data: { ...updateUserData },
            where: {
                id: +id
            }
        });
        return result;
    }

    deleteUser = async (id) => {
        const result = await this.db.users.delete({
            where: { id: +id }
        });
        return result;
    }

}