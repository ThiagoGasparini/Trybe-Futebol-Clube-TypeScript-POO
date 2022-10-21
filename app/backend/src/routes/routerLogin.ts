import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import LoginValidation from '../middlewares/LoginValidation';

const route = Router();

const loginController = new LoginController();
const loginValidation = new LoginValidation();

route.post('/', loginValidation.loginV, loginController.login);
route.get('/validate', loginController.validateTokenLogin);

export default route;
