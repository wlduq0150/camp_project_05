import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { sessionMiddleware } from "./appMiddleware/sessionMiddleware.js";
import { routerMiddleware } from "./appMiddleware/routerMiddleware.js";
import { errorMiddleware } from "./appMiddleware/errorMiddleware.js";

dotenv.config();
const app = express();

app.set("port", process.env.PORT || 3000);

// middleware
// middleware

app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(sessionMiddleware);
app.use(routerMiddleware);
app.use(errorMiddleware);

const server = app.listen(app.get("port"), () => {
	console.log(app.get("port") + "번 포트에서 서버 실행");
});