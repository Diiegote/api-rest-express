import express, { json } from "express";
import authRouter from "./routes/auth.routes.js";
import morgan from "morgan";

export const app = express();


app.use(morgan("dev"));
app.use(json());
app.use('/api/v1', authRouter);