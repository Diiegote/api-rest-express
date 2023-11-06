import mongoose from "mongoose";
import { envs } from "../config/envs.js";

const { MONGO_URI } = envs;
export const conn = mongoose.createConnection(MONGO_URI);
