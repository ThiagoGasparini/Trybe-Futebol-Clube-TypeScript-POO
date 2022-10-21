import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/user';

class LoginValidation {
  public model = UserModel;
  public loginV = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (!password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const result = await this.model.findOne({ where: { email }, raw: true });

    if (!result) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    if (!bcrypt.compareSync(password, result.password)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    next();
  };
}

export default LoginValidation;
