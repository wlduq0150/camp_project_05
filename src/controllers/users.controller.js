import { UserService } from "../services/users.service.js";

export class UserController {

    userService = new UserService();

    findUser = async (req, res, next) => {
        try {
            const result = await this.userService.findUser(req.user);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

}