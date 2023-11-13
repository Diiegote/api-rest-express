import { Router } from 'express';
import { infoUser, login, register, refreshToken, logout } from '../controllers/auth.controller.js';
import { validationResultExpress } from "../middlewares/validationRegister/validationResultExpress.js"
import { validationBody } from '../middlewares/validationRegister/validationBody.js';
import { validationBodyLogin } from '../middlewares/validationLogin/validationBodyLogin.js';
import { validationResultExpressLogin } from '../middlewares/validationLogin/validationResultExpressLogin.js';
import { requiereToken } from '../middlewares/requireToken.js';

const router = Router();

router.post('/register', validationBody, validationResultExpress, register);

router.post('/login', validationBodyLogin, validationResultExpressLogin, login);
router.get('/protected', requiereToken, infoUser);
router.get("/refresh", refreshToken);
router.get("/logout", logout);



export default router;