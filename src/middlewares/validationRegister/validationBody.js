import { body } from 'express-validator';
export const validationBody = [
   body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .normalizeEmail(),
   body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
   body("password", "Formato de password incorrecta").custom(
      (value, { req }) => {
         if (value !== req.body.repassword) {
            throw new Error("No coinciden las password");
         }
         return value;
      }
   )
];

