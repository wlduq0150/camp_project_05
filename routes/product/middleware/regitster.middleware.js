export const registerMiddleware = (req, res, next) => {
    const registerData = req.body;

    const validationRequired = (
        "name" in registerData &&
        "owner" in registerData &&
        "password" in registerData
    );

    const validationExclude = () => {
        for (let data of Object.keys(registerData)) {
            const columns = ["name", "password", "owner", "description"];
            if (!columns.includes(data)) {
                return false;
            }
        }

        return true;
    }

    if (!validationRequired || !validationExclude()) {
        next(new Error("product register failed: register propertry is wrong.."));
    }

    req.registerData = registerData;
    next();
}