import jwt from "jsonwebtoken";
import { envs } from "../config/envs.js";
import { TokenVerificationErrors } from "../helpers/tokenVerificationErrors.js";

export const requiereToken = (req, res, next) => {
   const { authorization } = req.headers;

   try {
      let token = authorization;
      if (!token) throw new Error('Invalid authorization');

      token = token.split(' ')[1];

      const { uid } = jwt.verify(token, envs.Authorization);

      req.uid = uid;

      next();
   } catch (error) {
      return res.status(401).json({ error: TokenVerificationErrors[error.message] });
   }
};