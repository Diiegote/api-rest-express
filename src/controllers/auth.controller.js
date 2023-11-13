import { envs } from "../config/envs.js";
import User from "../database/connectdb.js";
import { TokenVerificationErrors } from "../helpers/tokenVerificationErrors.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
   const { email, password, name, lastname } = req.body;
   try {
      const user = new User({ email, password, name, lastname });
      await user.save();
      return res.status(201).json({ Message: "User saved successfully" });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export const login = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });

      const result = await user.comparePassword(password);
      if (!result) return res.status(403).json({ Message: "Incorrect credentials" });

      const { token, expiresIn } = generateToken(user.id);
      generateRefreshToken(user.id, res);

      // res.cookie("token", token, {
      //    httpOnly: true,
      //    secure: !(envs.MODO === 'developer')
      // });

      return res.json({ token, expiresIn });
   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

export const infoUser = async (req, res) => {
   try {
      const { name, lastname, _id, email } = await User.findById(req.uid).lean();
      res.json({ name, lastname, _id, email });
   } catch (error) {
      return res.status(500).json({ error: error.message });
   }
};

export const refreshToken = (req, res) => {
   try {
      const refreshTokenCookie = req.cookies.refreshToken
      if (!refreshTokenCookie) throw new Error("No Bearer");

      const { uid } = jwt.verify(refreshTokenCookie, envs.JWT_REFRESH);

      const { token, expiresIn } = generateToken(uid);
      return res.json({ token, expiresIn });

   } catch (error) {
      return res.status(401).send({ error: TokenVerificationErrors[error.message] });
   }
};

export const logout = (req, res) => {
   res.clearCookie("refreshToken");
   res.json({ ok: true });
};
