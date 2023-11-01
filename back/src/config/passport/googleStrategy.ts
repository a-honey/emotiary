import passport from 'passport';
require('dotenv').config();
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import {
  generateAccessToken,
  generateRefreshToken,
} from '../../utils/tokenUtils';
import { storeRefreshTokenInDatabase } from '../../utils/tokenUtils';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const googleStrategy = new GoogleStrategy(
  {
    // Google 개발자 콘솔에서 생성한 OAuth 2.0 클라이언트 ID와 시크릿 키를 사용
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_PASSWORD,
    // 콜백 URL 설정 (인증 완료 후 리디렉션되는 URL)
    // callbackURL : '/users/google/callback',

    // 테스트용 콜백 URL 설정
    callbackURL: '/test/google/fake',
  },
  async (
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: any,
  ) => {
    // Google OAuth 인증이 성공했을 때 실행되는 함수
    console.log('google profile : ', profile);
    try {
      // Google 프로필에서 이메일 정보 추출
      const email = profile.emails[0].value;
      // 이메일로 사용자를 데이터베이스에서 찾음
      const exUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (exUser) {
        // 사용자가 이미 존재하면 AccessToken과 RefreshToken을 생성
        const jwtAccessToken = generateAccessToken(exUser);
        const jwtRefreshToken = generateRefreshToken(exUser);

        // RefreshToken을 데이터베이스에 저장
        await storeRefreshTokenInDatabase(exUser.id, jwtRefreshToken);

        // AccessToken과 RefreshToken을 클라이언트에게 전달
        done(null, {
          accessToken: jwtAccessToken,
          refreshToken: jwtRefreshToken,
        });
      } else {
        // 사용자가 존재하지 않으면 인증 실패
        done(null, null);
      }
    } catch (error) {
      return done(error);
    }
  },
);

passport.use(googleStrategy);

export default googleStrategy;
