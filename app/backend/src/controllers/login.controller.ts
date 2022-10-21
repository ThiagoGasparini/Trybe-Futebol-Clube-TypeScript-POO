import { Request, Response } from 'express';
import LoginService from '../services/login.service';
import CustomError from '../errors/CustomError';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await this.loginService.login(email, password);

    return res.status(200).json({ token });
  };

  // https://stackoverflow.com/questions/43915379/i-need-to-replace-bearer-from-the-header-to-verify-the-token
  public validateTokenLogin = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) throw new CustomError(401, 'Invalid Token!');

    const token = authorization.replace('Bearer ', '');
    const role = await this.loginService.validateTokenLogin(token);
    return res.status(200).json({ role });
  };
}
export default LoginController;
