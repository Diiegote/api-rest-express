import { body } from 'express-validator';
import User from "../../database/connectdb.js";


export const validationBody = [
   body("email", "Formato de email incorrecto")
      .trim()
      .isEmail()
      .notEmpty()
      .normalizeEmail(),
   body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
   body("name", "Nombre es requerido y debe tener al menos 3 caracteres").trim().notEmpty().isLength({ min: 3 }),
   body("name", "Formato de name incorrecto").isString(),
   body("lastname", "Apellido es requerido y debe tener al menos 3 caracteres").trim().notEmpty().isLength({ min: 3 }),
   body("lastname", "Formato de lastname incorrecto").isString(),
   body("password", "Formato de password incorrecta").custom(
      (value, { req }) => {
         if (value !== req.body.repassword) {
            throw new Error("No coinciden las password");
         }
         return value;
      }
   ),
   body("email", "Email already exists").custom(
      async (value, { req }) => {
         const existEmail = await User.findOne({ email: value });
         if (existEmail) throw new Error("Email already exists");
         return true;
      }
   )
];

