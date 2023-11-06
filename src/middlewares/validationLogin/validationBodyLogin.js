import { body } from 'express-validator';
export const validationBodyLogin = [
   body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
   body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 })
];
