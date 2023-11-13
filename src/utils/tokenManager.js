import jwt from "jsonwebtoken";
import { envs } from "../config/envs.js";


export const generateToken = (uid) => {
   const expiresIn = 60 * 15;
   try {
      const token = jwt.sign({ uid }, envs.Authorization, { expiresIn })
      return { token, expiresIn };
   } catch (error) {
      console.log(error);
   }
};

export const generateRefreshToken = (uid, res) => {
   const expiresIn = 60 * 60 * 24 * 30;

   try {
      const refreshToken = jwt.sign({ uid }, envs.JWT_REFRESH, { expiresIn });

      res.cookie("refreshToken", refreshToken, {
         httpOnly: true,
         secure: !(envs.MODO === "developer"),
         expires: new Date(Date.now() + expiresIn * 1000),
      });

   } catch (error) {
      console.log(error.message);
   }
};