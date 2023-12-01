import { AuthService } from "../services/auth.service.js";

export class AuthController {

    authService = new AuthService();

    register = async (req, res, next) => {
        try {
            const result = await this.authService.register(req.registerData);
            return res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }

    login = async (req, res, next) => {
        try {
            const result = await this.authService.login(req.loginData);
            return res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

}