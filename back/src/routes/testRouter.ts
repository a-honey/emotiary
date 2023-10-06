import { Router, Request, Response } from 'express';
import passport from 'passport';

const testAuthRouter = Router();

// 모의 소셜 로그인을 위한 라우트
testAuthRouter.get('/google', (req: Request, res: Response) => {
  // 테스트를 위해 가짜 로그인 URL로 리디렉션

  /* #swagger.tags = ['test']
         #swagger.security = [{
               "bearerAuth": []
    }] */

  const fakeGoogleLoginURL = '/test/google/fake'; // 가짜 소셜 로그인 URL
  res.redirect(fakeGoogleLoginURL);
});

// 가짜 소셜 로그인 처리
testAuthRouter.get('/google/fake', (req: Request, res: Response) => {
    /* #swagger.tags = ['test']
         #swagger.security = [{
               "bearerAuth": []
    }] */

  // 여기서 테스트용 가짜 사용자를 생성하거나, 테스트 계정을 사용하여 로그인 처리를 시뮬레이트
  const fakeUser = {
    email: 'echk1212@gmail.com',
    username: 'testcase',
  };

  // Passport.js를 사용하여 사용자 로그인 처리 (실제 인증 과정 대신 가짜 사용자 정보를 사용)
  passport.authenticate('google', { 
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
    session: false 
    }, (err, user) => {
    if (err) {
      return res.status(500).json({ error: 'Authentication error' });
    }
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // 여기에서 가짜 사용자를 사용하여 토큰 생성 및 클라이언트에게 전달하는 로직 추가
    // 예: 가짜 토큰 생성
    const fakeAccessToken = 'fakeAccessToken';
    const fakeRefreshToken = 'fakeRefreshToken';

    return res.status(200).json({ accessToken: fakeAccessToken, refreshToken: fakeRefreshToken });
  })(req, res);
});

export default testAuthRouter;