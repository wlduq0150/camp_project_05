import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
    const auth = JSON.parse(req.headers.authorization);

    console.log(auth);

    if (!auth || auth.split(" ")[0] !== "Bearer") {
        return res.status(401).send("로그인이 필요합니다.");
    }

    const token = auth.split(" ")[1];
    
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        if (err.message === "jwt expired") {
            return res.status(401).send({
                ok: false,
                message: "토큰이 만료되었습니다"
            });
        }

        return res.status(401).send({
            ok: false,
            message: "토큰이 손상되었습니다."
        });
    }

    if (decodedToken && decodedToken.userId) {
        req.user = decodedToken.userId;
    }

    next();
}