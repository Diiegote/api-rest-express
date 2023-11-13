import express, { json } from "express";
import authRouter from "./routes/auth.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";

export const app = express();


app.use(morgan("dev"));
app.use(json());
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);
app.use(express.static('src/public'));