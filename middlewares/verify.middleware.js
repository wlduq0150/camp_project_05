export const verifyRegisterData = (req, res, next) => {
    const registerData = req.body;

    const validationRequired = (
        "email" in registerData &&
        "name" in registerData &&
        "sex" in registerData &&
        "password" in registerData &&
        "passwordCheck" in registerData
    );

    const validationExcluded = () => {
        for (let data of Object.keys(registerData)) {
            const columns = ["email", "name", "sex", "password", "passwordCheck"];
            if (!columns.includes(data)) {
                return false;
            }
        }
        return true;
    }

    if (!validationRequired || !validationExcluded()) {
        return res.status(400).send("회원가입 정보가 잘못되었습니다.");
    }

    const emailCheck = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if (!emailCheck.test(registerData.email)) {
        return res.status(400).send("잘못된 형태의 이메일 형식입니다.");
    }

    if (registerData.password.length < 6) {
        return res.status(400).send("비밀번호는 6자 이상이여야 합니다.")
    }

    if (registerData.password !== registerData.passwordCheck) {
        return res.status(400).send("비밀번호와 확인 비밀번호가 불일치합니다.");
    }

    req.registerData = registerData;
    next();
}

export const verifyCreateProduct = (req, res, next) => {
    const createData = {
        ...req.body,
        userId: req.user,
        state: "FOR_SALE"
    }

    const validationRequired = (
        "title" in createData &&
        "userId" in createData &&
        "state" in createData
    );

    const validationExclude = () => {
        for (let data of Object.keys(createData)) {
            const columns = ["title", "userId", "state", "content"];
            if (!columns.includes(data)) {
                return false;
            }
        }

        return true;
    }

    if (!validationRequired || !validationExclude()) {
        return res.status(400).send("상품 생성정보가 잘못되었습니다.");
    }

    req.createData = createData;
    next();
}