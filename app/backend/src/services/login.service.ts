import * as bcrypt from 'bcryptjs';
import * as Jwt from 'jsonwebtoken';
import User from '../database/models/user';
import IToken from '../interfaces/IToken';
import IUser from '../interfaces/IUser';

class LoginService {
  model: User;

  constructor() {
    this.model = new User();
  }

  public login = async (email: string, password: string): Promise<string> => {
    const user = await User.findOne({ where: { email }, raw: true });
    if (!user) {
      return 'User not found';
    }

    if (!bcrypt.compareSync(password, user.password)) {
      return 'Incorrect password';
    }

    const token = Jwt.sign({ id: user.id }, 'jwt_secret', { expiresIn: '7d' });

    return token;
  };

  public validateTokenLogin = async (token: string): Promise<string> => {
    const decodedToken = Jwt.verify(token, 'jwt_secret') as IToken;

    const userData = await User.findOne({ where: { id: decodedToken.id } }) as unknown as IUser;

    return userData.role;
  };
}
export default LoginService;
