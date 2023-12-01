import db from "../models/index.js";

export class UserRepository {

    getAllUser = async () => {
        const users = await db.User.findAll();
        return users;
    }

    getUserById = async (id) => {
        const user = await db.User.findOne({
            where: { id },
            attributes: { exclude: ["password"] }
        });
        return user;
    }

    getUserByEmail = async (email) => {
        const user = await db.User.findOne({ email });
        return user;
    }

    createUser = async (createUserData) => {
        const { name, sex, email, password } = createUserData;
        const result = await db.User.create({
            name,
            sex,
            email,
            password
        });
        return result;
    }

    updateUser = async (id, updateUserData) => {
        const result = await db.User.update({
            ...updateUserData
        }, {
            where: { id }
        });
        return result;
    }

    deleteUser = async (id) => {
        const result = await db.User.destroy({
            where: { id }
        });
        return result;
    }

}