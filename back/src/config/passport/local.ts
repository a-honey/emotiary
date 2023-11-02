import passportLocal from 'passport-local';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

//TODO prismaClient.ts에서 import해와서 사용하기
const prisma = new PrismaClient();

// Passport-Local에서 필요한 모듈 및 객체를 가져옵니다.
const LocalStrategy = passportLocal.Strategy;

const localStrategy = new LocalStrategy(
  {
    // 사용자 이름(여기서는 이메일) 및 비밀번호 필드 이름을 설정합니다.
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      // 이메일을 사용하여 데이터베이스에서 사용자를 찾습니다.
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return done(null, false, { message: '사용자를 찾을 수 없습니다.' });
      }
      // 입력된 비밀번호와 데이터베이스에 저장된 해시된 비밀번호를 비교하여 일치하는지 확인합니다.
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return done(null, false, { message: '비밀번호가 일치하지 않습니다. ' });
      }
      // 사용자를 찾고 비밀번호가 일치하는 경우, 해당 사용자 정보를 반환하여 인증을 완료합니다.
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  },
);

export default localStrategy;
