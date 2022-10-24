import { NextFunction, Request, Response } from 'express';
import * as Jwt from 'jsonwebtoken';
import IToken from '../interfaces/IToken';
import CustomError from '../errors/CustomError';

const validateMatches = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const { homeTeam, awayTeam } = req.body;

  if (homeTeam === awayTeam) {
    return res
      .status(422)
      .json({
        message: 'It is not possible to create a match with two equal teams',
      });
  }

  if (!authorization) return res.status(401).json({ message: 'Token must be a valid token' });

  try {
    if (!authorization) return res.status(401).json({ message: 'Invalid Token!' });
    const token = authorization.replace('Bearer ', ''); // https://stackoverflow.com/questions/43915379/i-need-to-replace-bearer-from-the-header-to-verify-the-token

    Jwt.verify(token, 'jwt_secret') as IToken;
  } catch (error) {
    throw new CustomError(401, 'Token must be a valid token');
  }

  next();
};

export default validateMatches;
