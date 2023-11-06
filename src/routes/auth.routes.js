import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { validationResultExpress } from "../middlewares/validationRegister/validationResultExpress.js"
import { validationBody } from '../middlewares/validationRegister/validationBody.js';
import { validationBodyLogin } from '../middlewares/validationLogin/validationBodyLogin.js';
import { validationResultExpressLogin } from '../middlewares/validationLogin/validationResultExpressLogin.js';

const router = Router();

router.post('/register', validationBody, validationResultExpress, register);

router.post('/login', validationBodyLogin, validationResultExpressLogin, login);



export default router;