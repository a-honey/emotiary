import { Router, Request, Response, NextFunction } from 'express';
import passport from 'passport';

const testAuthRouter = Router();

import axios, { AxiosResponse } from "axios";

testAuthRouter.post('/predict', async(req : Request, res :Response, next : NextFunction) => {
  try{
    const text : string = req.body.text as string;

    const response = await axios.post('http://kdt-ai-8-team02.elicecoding.com:5000/predict', { text });

    if (response.status === 200) {
      // 성공적으로 처리됐을 때
      console.log(response.data); // 이것이 Python Flask 서버에서 반환한 JSON 데이터

      const emotion = response.data;

      const emotionType = emotion.emotion;

      const musicData = await searchMusic(emotionType);

      if (!musicData) {
        res.status(404).json({ message: "No songs found." });
    } else {
        res.status(200).json(musicData);
    }
  } else {
      // 서버에서 오류 응답을 반환했을 때
      console.error('에러:', response.data);
  }
    res.json(response.data);
  }catch(error){

    next(error);
  }
});

const youtubeApiKey: string = "AIzaSyB1d787FFm4D9Qw8keqyrj0fCqkTE94hhg";

async function searchMusic(emotion: string): Promise<any | null> {
  try {
      const searchQuery = `${emotion} music`;

      console.log(`https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&type=video&q=${searchQuery}`);

      const response: AxiosResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&type=video&q=${searchQuery}`
      );

      // API 응답 중에서 첫 번째 비디오 정보를 추출
      const firstVideo = response.data.items[0];

      if (!firstVideo) {
          return null; // 검색 결과가 없는 경우 null을 반환하거나 다른 처리를 할 수 있습니다.
      }

      // 노래 정보를 객체로 반환
      const musicData = {
          title: firstVideo.snippet.title,
          videoId: firstVideo.id.videoId,
      };

      return musicData;
  } catch (error) {
      console.error(error);
      throw error;
  }
}
















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