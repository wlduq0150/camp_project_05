
const router = express.Router();

// 회원가입
router.post("register", verifyRegisterData, (req, res, next) => {
    const { email, name, password } = req.registerData;

    

});

// 로그인
router.post("login", (req, res, next) => {

});