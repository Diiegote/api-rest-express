import mongoose from "mongoose";
import { envs } from "../config/envs.js";
import Userr from "../models/User.js";

const { MONGO_URI } = envs;
const conn = mongoose.createConnection(MONGO_URI);
const User = conn.model("User", Userr);
export default User;
