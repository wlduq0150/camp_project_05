import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { sessionMiddleware } from "./appMiddleware/sessionMiddleware.js";
import { routerMiddleware } from "./appMiddleware/routerMiddleware.js";
import { errorMiddleware } from "./appMiddleware/errorMiddleware.js";

// 환경변수 세팅
dotenv.config();
const app = express();

// 서버 포트 세팉
app.set("port", process.env.PORT || 3000);

// 템플릿 세팅 미들웨어
app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "views"), {
	express: app,
	watch: true,
});

// middleware
// middleware

app.use(morgan("dev"));

// 정적 파일들을 public이라는 폴더로 접근할수 있게 해주는 미들웨어
app.use(express.static(path.join(__dirname, "public")));

// 요청을 처리할 수 있게 변환해주는 미들웨어
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// 쿠키 처리 미들웨어
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);

// 라우터 404 에러 방지 미들웨어
app.use(routerMiddleware);

// 에러 핸들링 미들웨어
app.use(errorMiddleware);

const server = app.listen(app.get("port"), () => {
	console.log(app.get("port") + "번 포트에서 서버 실행");
});