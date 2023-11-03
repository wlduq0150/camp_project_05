export const updateMiddleware = (req, res, next) => {
    const updateData = req.body;

    const validationExclude = () => {
        for (let data of Object.keys(updateData)) {
            const columns = ["name", "password", "state", "owner", "description"];
            if (!columns.includes(data)) {
                return false;
            }
        }

        return true;
    }

    if (!validationExclude()) {
        next(new Error("product update failed: update property is wrong.."));
    }

    req.updateData = updateData;
    next();
}