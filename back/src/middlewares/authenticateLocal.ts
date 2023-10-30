import passport from 'passport';
import { Response, NextFunction } from 'express';
import { IRequest, IUser } from 'types/user';
import {
  generateAccessToken,
  generateRefreshToken,
  storeRefreshTokenInDatabase,
} from '../utils/tokenUtils';

export const localAuthentication = (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    passport.authenticate(
      'local',
      { session: false },
      async (error: Error, user: IUser, info: any) => {
        if (error) {
          console.log(error);
          next(error);
        }

        if (info) {
          console.log(info);
          next(info);
        }

        if (user) {
          const accessToken = generateAccessToken(user);
          const refreshToken = generateRefreshToken(user);
          await storeRefreshTokenInDatabase(user.id, refreshToken);

          req.token = accessToken;
          req.user = user;
          req.refreshTokens = [refreshToken];
          return next();
        }
      },
    )(req, res, next);
  } catch (error) {
    next(error);
  }
};
