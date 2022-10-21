import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const route = Router();

const loginController = new LoginController();

route.post('/', loginController.login);

export default route;
