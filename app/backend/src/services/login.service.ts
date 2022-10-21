import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import User from '../database/models/user';
import CustomError from '../errors/CustomError';

class LoginService {
  model: User;

  constructor() {
    this.model = new User();
  }

  public login = async (email: string, password: string): Promise<string> => {
    const userData = await User.findOne({ where: { email } });
    if (!userData) throw new CustomError(401, 'Incorrect email or password');

    const validatePassword = bcrypt.compareSync(password, userData.password);
    if (!validatePassword) throw new CustomError(401, 'Incorrect email or password');

    const token = Jwt.sign({ id: userData.id }, 'jwt_secret', { expiresIn: '7d' });
    return token;
  };
}
export default LoginService;
