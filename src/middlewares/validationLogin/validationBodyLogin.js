import { body } from 'express-validator';
import User from '../../database/connectdb.js';


export const validationBodyLogin = [
   body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
   body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
   body("email", "User not exists").custom(
      async (value, { req }) => {
         const existEmail = await User.findOne({ email: value });
         if (!existEmail) throw new Error("User not exists");
         return true;
      }
   )
];
