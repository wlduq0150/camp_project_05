import { HttpException } from "../error/Http.exception.js";
import { UserRepository } from "../repository/users.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {

    userRepository = new UserRepository();

    register = async (registerData) => {
        const { email, name, sex, password, passwordCheck } = registerData;

        const user = await this.userRepository.getUserByEmail(email);
        if (user) {
            throw new HttpException(409, "이미 가입된 이메일입니다.");
        }

        if (password !== passwordCheck) {
            throw new HttpException(400, "확인 비밀번호가 틀렸습니다.");
        }

        const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        // 유저 생성
        await this.userRepository.createUser({
            ...registerData,
            password: hashPassword
        });

        // 비밀번호를 제외한 정보 반환
        return {
            ok: true,
            message: "회원가입에 성공했습니다.",
            data: {
                email,
                name,
                sex
            }
        };
    };

    login = async (loginData) => {
        const { email, password } = loginData;

        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new HttpException(404, "존재하지 않는 이메일입니다.");
        }

        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            throw new HttpException(401, "비밀번호가 틀렸습니다.");
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "12h" });

        return {
            ok: true,
            message: "로그인에 성공했습니다.",
            data: { accessToken: token }
        };
    }
}
