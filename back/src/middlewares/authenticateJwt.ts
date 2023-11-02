import { Response, NextFunction } from 'express';
import passport from 'passport';
import { IRequest, IUser } from 'types/user';

export const jwtAuthentication = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    passport.authenticate(
      'jwt',
      { session: false },
      (error: Error, user: IUser, info: any) => {
        if (error) {
          console.log(error);
          next(error);
        }
        if (info && info.name === 'TokenExpiredError') {
          //TODO 이렇게 해두면 info.name이 아닌 다른 info들은 에러 처리가 되지 않지 않나요?
          // info.name에 대한 별도의 처리를 하고싶을 경우엔 if(info){ if(info.name) return~~~} 으로 처리해주면 되지 않을까요?
          console.log(info);
          res.status(401).json({ expired: true });
        }
        req.user = user;
        next();
      },
    )(req, res, next);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
