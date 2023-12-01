import { HttpException } from "../error/Http.exception.js";

export const verifyRegisterData = (req, res, next) => {
    const registerData = req.body;

    const isValidRequired = (
        "email" in registerData &&
        "name" in registerData &&
        "sex" in registerData &&
        "password" in registerData &&
        "passwordCheck" in registerData
    );

    const isValidFields = () => {
        for (let data of Object.keys(registerData)) {
            const columns = ["email", "name", "sex", "password", "passwordCheck"];
            if (!columns.includes(data)) {
                return false;
            }
        }
        return true;
    }

    if (!isValidRequired || !isValidFields()) {
        throw new HttpException(400, "회원가입 정보가 잘못되었습니다.");
    }

    const emailCheck = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!emailCheck.test(registerData.email)) {
        throw new HttpException(400, "잘못된 형태의 이메일 형식입니다.");
    }

    if (registerData.password.length < 6) {
        throw new HttpException(400, "비밀번호는 6자 이상이여야 합니다.");
    }

    if (registerData.password !== registerData.passwordCheck) {
        throw new HttpException(400, "비밀번호와 확인 비밀번호가 불일치합니다.");
    }

    req.registerData = registerData;
    next();
}

export const verifyLoginData = (req, res, next) => {
    const loginData = req.body;

    const isValidRequired = (
        "email" in loginData &&
        "password" in loginData
    );

    const isValidFields = () => {
        for (let data of Object.keys(loginData)) {
            const columns = ["email", "password"];
            if (!columns.includes(data)) {
                return false;
            }
        }
        return true;
    }

    if (!isValidRequired || !isValidFields()) {
        throw new HttpException(400, "로그인 정보가 잘못되었습니다.");
    }

    req.loginData = loginData;
    next();
}

export const verifyCreateProductData = (req, res, next) => {
    const createProductData = {
        ...req.body,
        userId: req.user,
        state: "FOR_SALE"
    }

    const isValidRequired = (
        "title" in createProductData &&
        "userId" in createProductData &&
        "state" in createProductData
    );

    const isValidFields = () => {
        for (let data of Object.keys(createProductData)) {
            const columns = ["title", "userId", "state", "content"];
            if (!columns.includes(data)) {
                return false;
            }
        }

        return true;
    }

    if (!isValidRequired || !isValidFields()) {
        return res.status(400).send("상품 생성정보가 잘못되었습니다.");
    }

    req.createProductData = createProductData;
    next();
}

export const verifyUpdateProductData = (req, res, next) => {
    const updateProductData = req.body;

    const isValidFields = () => {
        for (let data of Object.keys(updateProductData)) {
            const columns = ["title", "userId", "state", "content"];
            if (!columns.includes(data)) {
                return false;
            }
        }

        return true;
    }

    if (!isValidFields()) {
        return res.status(400).send("상품 수정정보가 잘못되었습니다.");
    }

    req.updateProductData = updateProductData;
    next();
}