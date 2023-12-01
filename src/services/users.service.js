import { UserRepository } from "../repository/users.repository.js";

export class UserService {

    userRepository = new UserRepository();

    findUser = async (id) => {
        const user = await this.userRepository.getUserById(id);
        if (!user) {
            throw new Error(404, "존재하지 않는 유저입니다.");
        }

        return {
            ok: true,
            message: "사용자 조회를 완료했습니다.",
            data: user
        };
    }

}