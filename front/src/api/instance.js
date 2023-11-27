import axios from 'axios';
import { getRefreshToken } from '../utils/localStorageHandlers';
import MockAdapter from 'axios-mock-adapter';

import 나비스 from '../assets/나비스.png';

// const baseURL = process.env.REACT_APP_BASE_URL;
const baseURL = 'http://localhost:3000';

export const instance = axios.create({
  baseURL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('token');

    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${userToken}`;
    /*
    const response = instance.get('/users/tokenExpire');
    if (response.data.expired) {
      const response = instance.post('/users/refresh-token', getRefreshToken);
      localStorage.removeItem('token');
      localStorage.setItem('token', response.data.data);
      return;
    } */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const formDataInstance = axios.create({
  baseURL,
  timeout: 3000,
});

formDataInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('token');

    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    config.headers['Authorization'] = `Bearer ${userToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const mock = new MockAdapter(instance);

mock
  .onGet(
    '/diary/views/date/1670b871-fcdb-4e69-b08a-186800499a02?year=2023&month=10'
  )
  .reply(200, {
    data: [
      {
        id: 'e2152874-83ba-4179-aad4-cb3ab3018e5f',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-01T00:00:00.000Z',
        title: '채팅된다!!!',
        content: '다들 반가워요',
        is_public: 'all',
        emoji: '🤣',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: 'a4cc166f-fdd5-4ad0-bf3a-125d0c8409ae',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-02T00:00:00.000Z',
        title: '오늘의 플로깅',
        content: '오늘의 플로깅',
        is_public: 'all',
        emoji: '😶',
        emotion: '중립',
        favoriteCount: 1,
        audioUrl:
          'https://rr5---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023610&ei=mrZEZfHDFLm3s8IPha29qA4&ip=122.37.232.34&id=o-AMGX30gLBGnI2apMWNisTX0JtprtVgZu4GbycjoivDyY&itag=251&source=youtube&requiressl=yes&mh=Ty&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=5&pcm2cms=yes&pl=21&initcwndbps=1548750&spc=UWF9f82BI1DPm7QznoKC9OP5QwSY3uYysCwcSw_pjw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=PF9-H1CjGNM7ZNa3iA7Ev8QP&gir=yes&clen=40604138&dur=2507.901&lmt=1660082827981577&mt=1699001586&fvip=3&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=5432434&n=s5Cv8_97ZtAT1w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRgIhAM7GgrEnf2XRKnT0PD1KRCajCXYkWykt8mIvqa2aZXF7AiEAkqoxSYNg89J1PTFPOdPj7fL_9SK7phG46Sqn7oQcTO8%3D&sig=ANLwegAwRgIhAODVM9zshrFpzEKhO5wr3nnPvV8sLLpKcqkb2ReYs-diAiEAozZ61QlLcoqy27k0J4DPRR6nOAHBFuBBsWDJmHdegf8%3D',
      },
      {
        id: 'c912d21a-bdf3-421e-b24c-d7804cd0516f',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-03T00:00:00.000Z',
        title: '졸려요',
        content: '졸려요',
        is_public: 'all',
        emoji: '😭',
        emotion: '슬픔',
        favoriteCount: 2,
        audioUrl:
          'https://rr7---sn-ab02a0nfpgxapox-bh2zs.googlevideo.com/videoplayback?expire=1699023602&ei=krZEZYStDLKI1d8PjN-A8Aw&ip=122.37.232.34&id=o-AH6qFfhhoKpy_TRpk_Fvkew_UBXOpRhGFmbgRfOK7b9D&itag=251&source=youtube&requiressl=yes&mh=SU&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zs%2Csn-un57snee&ms=au%2Conr&mv=m&mvi=7&pl=21&initcwndbps=1412500&spc=UWF9f2afN0TBeFW1mZVdnzdV3BoavC41SFzyCkHmxg&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=JtBDF8_OOEzEBGvQi22VYtwP&gir=yes&clen=48561663&dur=2616.321&lmt=1607602697636531&mt=1699001586&fvip=3&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=6311222&n=QQ0bqxZEIEeecg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRAIgHZk9UE07YdbaRxEemcAkpk4ktn-2JVnWpA33ckwdf7sCICD2PsrKOia19jnenERWkIl45vx8j4vuIcdEPYY62jkx&sig=ANLwegAwRgIhAPlIR_QPDWWQrIX2TdH6dO3RZ12fguV_zqx84RutNaj8AiEA-IHBTS_mja4qyJt4nmSD6EMVRPWw7Ydg4Rxg6Jx4zT8%3D',
      },
      {
        id: '6f8ab970-e13c-4f49-86c7-d651c495436c',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-04T00:00:00.000Z',
        title: '은진님 멋져요',
        content: 'cors() 지옥해결',
        is_public: 'all',
        emoji: '😑',
        emotion: '중립',
        favoriteCount: 4,
        audioUrl:
          'https://rr5---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023610&ei=mrZEZfHDFLm3s8IPha29qA4&ip=122.37.232.34&id=o-AMGX30gLBGnI2apMWNisTX0JtprtVgZu4GbycjoivDyY&itag=251&source=youtube&requiressl=yes&mh=Ty&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=5&pcm2cms=yes&pl=21&initcwndbps=1548750&spc=UWF9f82BI1DPm7QznoKC9OP5QwSY3uYysCwcSw_pjw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=PF9-H1CjGNM7ZNa3iA7Ev8QP&gir=yes&clen=40604138&dur=2507.901&lmt=1660082827981577&mt=1699001586&fvip=3&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=5432434&n=s5Cv8_97ZtAT1w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRgIhAM7GgrEnf2XRKnT0PD1KRCajCXYkWykt8mIvqa2aZXF7AiEAkqoxSYNg89J1PTFPOdPj7fL_9SK7phG46Sqn7oQcTO8%3D&sig=ANLwegAwRgIhAODVM9zshrFpzEKhO5wr3nnPvV8sLLpKcqkb2ReYs-diAiEAozZ61QlLcoqy27k0J4DPRR6nOAHBFuBBsWDJmHdegf8%3D',
      },
      {
        id: '0996f198-7766-423b-acfd-29be73324591',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-05T00:00:00.000Z',
        title: '다들 데이터 만드세요',
        content: '다들 데이터 만드세요',
        is_public: 'all',
        emoji: '😐',
        emotion: '중립',
        favoriteCount: 2,
        audioUrl:
          'https://rr5---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023610&ei=mrZEZfHDFLm3s8IPha29qA4&ip=122.37.232.34&id=o-AMGX30gLBGnI2apMWNisTX0JtprtVgZu4GbycjoivDyY&itag=251&source=youtube&requiressl=yes&mh=Ty&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=5&pcm2cms=yes&pl=21&initcwndbps=1548750&spc=UWF9f82BI1DPm7QznoKC9OP5QwSY3uYysCwcSw_pjw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=PF9-H1CjGNM7ZNa3iA7Ev8QP&gir=yes&clen=40604138&dur=2507.901&lmt=1660082827981577&mt=1699001586&fvip=3&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=5432434&n=s5Cv8_97ZtAT1w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRgIhAM7GgrEnf2XRKnT0PD1KRCajCXYkWykt8mIvqa2aZXF7AiEAkqoxSYNg89J1PTFPOdPj7fL_9SK7phG46Sqn7oQcTO8%3D&sig=ANLwegAwRgIhAODVM9zshrFpzEKhO5wr3nnPvV8sLLpKcqkb2ReYs-diAiEAozZ61QlLcoqy27k0J4DPRR6nOAHBFuBBsWDJmHdegf8%3D',
      },
      {
        id: 'a3f368a9-34e5-4da0-954b-eee05d9a032e',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-06T00:00:00.000Z',
        title: '행복',
        content: '행복',
        is_public: 'all',
        emoji: '🤣',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: '187af49c-e91e-4489-afee-f9ad89cc3fcf',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-07T00:00:00.000Z',
        title: '행복',
        content: '행복',
        is_public: 'all',
        emoji: '😙',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: 'beae1438-3e32-4a0c-bf89-5c41bafa23df',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-08T00:00:00.000Z',
        title: '행복해',
        content: '행복해',
        is_public: 'all',
        emoji: '🥰',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: '19f41242-f8ae-421e-8d96-42539df2992a',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-09T00:00:00.000Z',
        title: '야호',
        content: '야호',
        is_public: 'all',
        emoji: '😙',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: '46f19e23-084e-43a7-b2ce-825a75394311',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-10T00:00:00.000Z',
        title: '행복',
        content: '행복',
        is_public: 'all',
        emoji: '🤣',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: '368922bc-df06-4899-b122-c564f357c255',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-11T00:00:00.000Z',
        title: '행복',
        content: '행복하구먼',
        is_public: 'all',
        emoji: '😙',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: '7af030b8-d59c-467c-b657-b05864dede13',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-12T00:00:00.000Z',
        title: '기쁨',
        content: '기쁘구만',
        is_public: 'all',
        emoji: '😙',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: '3b3f556f-916d-40d7-ae14-d153baa5e910',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-13T00:00:00.000Z',
        title: '행복한 하루',
        content: '오늘 행복한 하루를 보냈어요. 하늘 너무 예뻐요!',
        is_public: 'all',
        emoji: '🤣',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: '646f8a11-4ed5-4957-8472-0ea0e89cb81d',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-14T00:00:00.000Z',
        title: '오늘의 플로깅',
        content: '안녕하세요',
        is_public: 'all',
        emoji: '🤣',
        emotion: '행복',
        favoriteCount: 1,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: 'ecb021f1-7a52-4058-b35c-c328c54b732d',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-15T00:00:00.000Z',
        title: '놀러가고 싶다',
        content: '비행기타고 싶다',
        is_public: 'all',
        emoji: '😿',
        emotion: '슬픔',
        favoriteCount: 1,
        audioUrl:
          'https://rr7---sn-ab02a0nfpgxapox-bh2zs.googlevideo.com/videoplayback?expire=1699023602&ei=krZEZYStDLKI1d8PjN-A8Aw&ip=122.37.232.34&id=o-AH6qFfhhoKpy_TRpk_Fvkew_UBXOpRhGFmbgRfOK7b9D&itag=251&source=youtube&requiressl=yes&mh=SU&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zs%2Csn-un57snee&ms=au%2Conr&mv=m&mvi=7&pl=21&initcwndbps=1412500&spc=UWF9f2afN0TBeFW1mZVdnzdV3BoavC41SFzyCkHmxg&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=JtBDF8_OOEzEBGvQi22VYtwP&gir=yes&clen=48561663&dur=2616.321&lmt=1607602697636531&mt=1699001586&fvip=3&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=6311222&n=QQ0bqxZEIEeecg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRAIgHZk9UE07YdbaRxEemcAkpk4ktn-2JVnWpA33ckwdf7sCICD2PsrKOia19jnenERWkIl45vx8j4vuIcdEPYY62jkx&sig=ANLwegAwRgIhAPlIR_QPDWWQrIX2TdH6dO3RZ12fguV_zqx84RutNaj8AiEA-IHBTS_mja4qyJt4nmSD6EMVRPWw7Ydg4Rxg6Jx4zT8%3D',
      },
      {
        id: '491e79bc-1c15-4515-a885-503e7c4ed4d5',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-16T00:00:00.000Z',
        title: '하트가 좋아',
        content: '하트가 좋아',
        is_public: 'all',
        emoji: '🤣',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: '56a7f823-20df-4090-835e-f64a55f03066',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-17T00:00:00.000Z',
        title: '킹',
        content: '킹받드라슈',
        is_public: 'all',
        emoji: '😠',
        emotion: '분노',
        favoriteCount: 1,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023612&ei=nLZEZba_J92e7OsPt5WW8Ao&ip=122.37.232.34&id=o-AM8eU7CpbaHaYB8ABkavB7DSMOGDoQ9Az97E1pWID3DT&itag=251&source=youtube&requiressl=yes&mh=5z&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57snee&ms=au%2Conr&mv=m&mvi=4&pl=21&initcwndbps=1548750&spc=UWF9f-pzeWtA6ChWY9nHavYmGpV6cywrBpcS_uCMYQ&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=R6m1ZrmbROODTCRHbq_QsDgP&gir=yes&clen=823891131&dur=35967.021&lmt=1669531453305673&mt=1699001586&fvip=4&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=5532434&n=V6e99JHYwal7cA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=ANLwegAwRQIgI0nOu1Fn-c9aCiH0i4nvlwDuIhiVhSPKdaO-5bFU1gwCIQD-qFyyM8ijroLmFDw-aFYRwUWFTI5D0Zi4peL4FuC9LA%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRAIgYKampEWJ6EAwJOZREnuIn5787MNSAY7lK0wntjksTqACIBV0F_9WBGEr1R_YjBeQ1xUeN-qm1BYW0aayk93dpKhS',
      },
      {
        id: '63c57546-e850-4888-8ea4-709f5bde2640',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-18T00:00:00.000Z',
        title: '당황스럽다',
        content: '당황스럽다',
        is_public: 'all',
        emoji: '😬',
        emotion: '불안',
        favoriteCount: 3,
        audioUrl:
          'https://rr6---sn-ab02a0nfpgxapox-bh2s6.googlevideo.com/videoplayback?expire=1699023615&ei=n7ZEZZyVEfqM0-kPxYCQmAE&ip=122.37.232.34&id=o-AOi4sB0lgt5WMK3nz6DcYkSJrg6VFS2KHzb9oIPvXFd1&itag=140&source=youtube&requiressl=yes&mh=BA&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2s6%2Csn-un57enel&ms=au%2Conr&mv=m&mvi=6&pl=21&initcwndbps=1896250&spc=UWF9f5i0ubZycUbmoW0jiJYV1dNLeYNB5eFg91Uv1g&vprv=1&svpuc=1&mime=audio%2Fmp4&ns=9qaUwmgnVOlu8jIuySTFQTYP&gir=yes&clen=465849813&dur=28784.754&lmt=1674921490980985&mt=1699001822&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=5532434&n=8VhyWJziK15BmQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&sig=ANLwegAwRAIgC-qCo56wLhxpDwDVKCZQg_XjlH_1Oj6AvQ7ZRuzDbKQCIBrnWmZVDu-N9ULbXH3ddFYbhMIjg-gAALg3ygNeCy_x&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRgIhALWn_ngpi-tUNv1cynRdYEdLWa-4wfIg7pHzdJtHwt-9AiEAivygHHrZr9EXDWuaINAY60U2J4_XC_lkNIS_1WeNBuQ%3D',
      },
      {
        id: 'c138ed16-4162-41ec-96cd-1732c5c27205',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-19T00:00:00.000Z',
        title: '이모지 콜렉터',
        content: '다모아',
        is_public: 'all',
        emoji: '😙',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: 'f584227f-2c62-4472-b259-6106a62e0abd',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-20T00:00:00.000Z',
        title: '하트 임티 줘',
        content: '하트',
        is_public: 'all',
        emoji: '🥰',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: 'c1dcaa4e-342d-420c-891d-118adc69756a',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-21T00:00:00.000Z',
        title: '오늘 하늘 너무 예뻐요',
        content: '밖에 나갔다가 하늘 보고 기분 좋아졌어요!',
        is_public: 'all',
        emoji: '🤣',
        emotion: '행복',
        favoriteCount: 1,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: '7a35992d-319f-4116-b50c-e69dc9fd5716',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-22T00:00:00.000Z',
        title: '기쁘구만',
        content: '기쁘구만',
        is_public: 'all',
        emoji: '🤣',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: '4005a220-fe1b-44b9-a60f-b70ae7dcda06',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-23T00:00:00.000Z',
        title: '뮤지컬',
        content: '보고싶은데 비싸서 슬퍼',
        is_public: 'all',
        emoji: '😢',
        emotion: '슬픔',
        favoriteCount: 1,
        audioUrl:
          'https://rr7---sn-ab02a0nfpgxapox-bh2zs.googlevideo.com/videoplayback?expire=1699023602&ei=krZEZYStDLKI1d8PjN-A8Aw&ip=122.37.232.34&id=o-AH6qFfhhoKpy_TRpk_Fvkew_UBXOpRhGFmbgRfOK7b9D&itag=251&source=youtube&requiressl=yes&mh=SU&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zs%2Csn-un57snee&ms=au%2Conr&mv=m&mvi=7&pl=21&initcwndbps=1412500&spc=UWF9f2afN0TBeFW1mZVdnzdV3BoavC41SFzyCkHmxg&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=JtBDF8_OOEzEBGvQi22VYtwP&gir=yes&clen=48561663&dur=2616.321&lmt=1607602697636531&mt=1699001586&fvip=3&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=6311222&n=QQ0bqxZEIEeecg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRAIgHZk9UE07YdbaRxEemcAkpk4ktn-2JVnWpA33ckwdf7sCICD2PsrKOia19jnenERWkIl45vx8j4vuIcdEPYY62jkx&sig=ANLwegAwRgIhAPlIR_QPDWWQrIX2TdH6dO3RZ12fguV_zqx84RutNaj8AiEA-IHBTS_mja4qyJt4nmSD6EMVRPWw7Ydg4Rxg6Jx4zT8%3D',
      },
      {
        id: '1f577819-9c03-49c4-91fe-e79e8d1a56fc',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-24T00:00:00.000Z',
        title: '자바 완전 정복',
        content: '사실 내가 정복 당함',
        is_public: 'all',
        emoji: '😐',
        emotion: '중립',
        favoriteCount: 4,
        audioUrl: null,
      },
      {
        id: '9500c134-53ab-4448-9716-a1bae0b70921',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-25T00:00:00.000Z',
        title: '무한도전',
        content: '무한도전',
        is_public: 'all',
        emoji: '🥰',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zk.googlevideo.com/videoplayback?expire=1699014782&ei=HpREZY_xJNmOvcAP5p6G-AM&ip=122.37.232.34&id=o-AKhsB65_TPFrY_h_yyt_CQ3WHT-_GmltGgQiEl7BMn8Z&itag=251&source=youtube&requiressl=yes&mh=me&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zk%2Csn-un57sn7y&ms=au%2Conr&mv=m&mvi=4&pl=21&initcwndbps=1748750&spc=UWF9f1iQYWrMJwe1LOlQF3ag-RK5jrRaY1xsAtUefQ&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=fBkM8rhmf1nA-KE202g5V3wP&gir=yes&clen=68237116&dur=3804.241&lmt=1610561233671627&mt=1698992702&fvip=2&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=5431432&n=B2Cvh9vHVJLpeg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIgEfa_a2ZtbWwqgirjo7-SywMNjNR6aBGpmGS05qXOzlECIQC6ZmLAJQTj8sympU5tuyRO-um2Q1iomMj-EnjZRbIeyQ%3D%3D&sig=ANLwegAwRQIhAKK1uaFGyXdZ4D0dvUF3f34K07tcUBjpHGjHuyqghxG9AiALNxFg0MH6LLmU3E5AVFBlYnxV6bOjEG-eR9kvnU_-XQ%3D%3D',
      },
      {
        id: '25602ce5-a789-4d57-9280-8c27347f2a60',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-26T00:00:00.000Z',
        title: '행복해',
        content: '오늘 행복하구만',
        is_public: 'all',
        emoji: '🥰',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: 'dfc525c6-1592-4565-9779-56c7de1ca150',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-27T00:00:00.000Z',
        title: '노래 그만나와',
        content: '노래 그만나와',
        is_public: 'all',
        emoji: '😢',
        emotion: '슬픔',
        favoriteCount: 1,
        audioUrl:
          'https://rr7---sn-ab02a0nfpgxapox-bh2zs.googlevideo.com/videoplayback?expire=1699023602&ei=krZEZYStDLKI1d8PjN-A8Aw&ip=122.37.232.34&id=o-AH6qFfhhoKpy_TRpk_Fvkew_UBXOpRhGFmbgRfOK7b9D&itag=251&source=youtube&requiressl=yes&mh=SU&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zs%2Csn-un57snee&ms=au%2Conr&mv=m&mvi=7&pl=21&initcwndbps=1412500&spc=UWF9f2afN0TBeFW1mZVdnzdV3BoavC41SFzyCkHmxg&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=JtBDF8_OOEzEBGvQi22VYtwP&gir=yes&clen=48561663&dur=2616.321&lmt=1607602697636531&mt=1699001586&fvip=3&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=6311222&n=QQ0bqxZEIEeecg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRAIgHZk9UE07YdbaRxEemcAkpk4ktn-2JVnWpA33ckwdf7sCICD2PsrKOia19jnenERWkIl45vx8j4vuIcdEPYY62jkx&sig=ANLwegAwRgIhAPlIR_QPDWWQrIX2TdH6dO3RZ12fguV_zqx84RutNaj8AiEA-IHBTS_mja4qyJt4nmSD6EMVRPWw7Ydg4Rxg6Jx4zT8%3D',
      },
      {
        id: '042c17fc-0efa-4025-a49f-7e39bc306253',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-28T00:00:00.000Z',
        title: '아 행복하다',
        content: '오늘 야외 스케치함',
        is_public: 'all',
        emoji: '🤣',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
      },
      {
        id: 'd627c031-3b74-4fc3-8527-d80c4a1b4eaf',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-29T00:00:00.000Z',
        title: '공부해',
        content: '공부 시러',
        is_public: 'all',
        emoji: '😡',
        emotion: '분노',
        favoriteCount: 1,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-jwwr.googlevideo.com/videoplayback?expire=1699014878&ei=fZREZbyaO-2w2roP5YyOyAE&ip=122.37.232.34&id=o-AKe5i_qY-1UtnPWY4-SYUYU7RnyAGvdd8bl8272MjjAC&itag=251&source=youtube&requiressl=yes&mh=W2&mm=31%2C26&mn=sn-ab02a0nfpgxapox-jwwr%2Csn-un57enel&ms=au%2Conr&mv=m&mvi=4&pl=21&initcwndbps=1718750&spc=UWF9f1QEn6FCfqv7F3Dy_v22ZtGCyNLZZ5gu8wU76A&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=so5oIycVTG1OnIeCnAXjVMgP&gir=yes&clen=33789487&dur=2120.841&lmt=1609826176787582&mt=1698992942&fvip=4&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=6311222&n=tlRcnk17B_U-Bg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIgI2H_6gvRZcUBQ-XWjloaxfRYAbEY5JGsVBPjuvAHUi4CIQDdMmlOciSMc4QSO0irroLKaehlYyHRrUOpLOiuCq8ZrQ%3D%3D&sig=ANLwegAwRgIhAKekLW1ORQk3x1cDtrQh9liWi_dOTDpF2H0ElAX2OQPnAiEAlwPYBGhG9Ka9E7kuTER9z7ia-eLdF9RSA1uYzGN7K90%3D',
      },
      {
        id: '9fec5495-4b2b-460f-86ae-2e35d5c5d93b',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-30T00:00:00.000Z',
        title: '신난다',
        content: '재미난다',
        is_public: 'all',
        emoji: '🥰',
        emotion: '행복',
        favoriteCount: 0,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zk.googlevideo.com/videoplayback?expire=1699014782&ei=HpREZY_xJNmOvcAP5p6G-AM&ip=122.37.232.34&id=o-AKhsB65_TPFrY_h_yyt_CQ3WHT-_GmltGgQiEl7BMn8Z&itag=251&source=youtube&requiressl=yes&mh=me&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zk%2Csn-un57sn7y&ms=au%2Conr&mv=m&mvi=4&pl=21&initcwndbps=1748750&spc=UWF9f1iQYWrMJwe1LOlQF3ag-RK5jrRaY1xsAtUefQ&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=fBkM8rhmf1nA-KE202g5V3wP&gir=yes&clen=68237116&dur=3804.241&lmt=1610561233671627&mt=1698992702&fvip=2&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=5431432&n=B2Cvh9vHVJLpeg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIgEfa_a2ZtbWwqgirjo7-SywMNjNR6aBGpmGS05qXOzlECIQC6ZmLAJQTj8sympU5tuyRO-um2Q1iomMj-EnjZRbIeyQ%3D%3D&sig=ANLwegAwRQIhAKK1uaFGyXdZ4D0dvUF3f34K07tcUBjpHGjHuyqghxG9AiALNxFg0MH6LLmU3E5AVFBlYnxV6bOjEG-eR9kvnU_-XQ%3D%3D',
      },
      {
        id: '75aeab60-b7b6-4bfd-9874-0b693e02ff2e',
        authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
        createdDate: '2023-10-31T00:00:00.000Z',
        title: '최고심 좋아요',
        content: '최고심 팝업스토어 사람 짱많우',
        is_public: 'all',
        emoji: '😙',
        emotion: '행복',
        favoriteCount: 1,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zk.googlevideo.com/videoplayback?expire=1699014782&ei=HpREZY_xJNmOvcAP5p6G-AM&ip=122.37.232.34&id=o-AKhsB65_TPFrY_h_yyt_CQ3WHT-_GmltGgQiEl7BMn8Z&itag=251&source=youtube&requiressl=yes&mh=me&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zk%2Csn-un57sn7y&ms=au%2Conr&mv=m&mvi=4&pl=21&initcwndbps=1748750&spc=UWF9f1iQYWrMJwe1LOlQF3ag-RK5jrRaY1xsAtUefQ&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=fBkM8rhmf1nA-KE202g5V3wP&gir=yes&clen=68237116&dur=3804.241&lmt=1610561233671627&mt=1698992702&fvip=2&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=5431432&n=B2Cvh9vHVJLpeg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIgEfa_a2ZtbWwqgirjo7-SywMNjNR6aBGpmGS05qXOzlECIQC6ZmLAJQTj8sympU5tuyRO-um2Q1iomMj-EnjZRbIeyQ%3D%3D&sig=ANLwegAwRQIhAKK1uaFGyXdZ4D0dvUF3f34K07tcUBjpHGjHuyqghxG9AiALNxFg0MH6LLmU3E5AVFBlYnxV6bOjEG-eR9kvnU_-XQ%3D%3D',
      },
    ],
    message: '성공',
    status: 200,
  });

mock.onGet('/diary/25602ce5-a789-4d57-9280-8c27347f2a60').reply(200, {
  data: {
    id: '25602ce5-a789-4d57-9280-8c27347f2a60',
    authorId: '1670b871-fcdb-4e69-b08a-186800499a02',
    createdDate: '2023-10-26T00:00:00.000Z',
    title: '행복해',
    content: '오늘 행복하구만',
    is_public: 'all',
    emoji: '🥰',
    emotion: '행복',
    favoriteCount: 7,
    audioUrl:
      'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
    author: {
      id: '1670b871-fcdb-4e69-b08a-186800499a02',
      username: '정아현',
      email: 'jah512@naver.com',
      profileImage: [
        {
          id: 44,
          url: 'fileUpload/1699015260464.jpg',
          userId: '1670b871-fcdb-4e69-b08a-186800499a02',
          createdAt: '2023-11-03T12:41:00.474Z',
        },
      ],
    },
    filesUpload: [],
  },
  message: '성공',
  status: 200,
});

mock.onGet('/comments/25602ce5-a789-4d57-9280-8c27347f2a60').reply(200, {
  data: [
    {
      id: '1c9cfe6b-9564-4169-b490-5613ac3aec04',
      diaryId: '25602ce5-a789-4d57-9280-8c27347f2a60',
      content: '행복한 하루에 대해 정말 좋아요!',
      createdAt: '2023-11-03T09:00:18.168Z',
      updatedAt: '2023-11-03T09:00:18.168Z',
      reComment: [
        {
          id: '5157fd64-2ada-45f0-af7e-e653e5641740',
          author: {
            id: '9ae2271b-ff44-4fef-bc8b-665b5dd9d39d',
            username: '이창근',
            profileImage: [],
          },
          diaryId: '63c57546-e850-4888-8ea4-709f5bde2640',
          content: '미쳤어요~>?',
          emoji: '😢',
          createdAt: '2023-11-03T09:58:40.546Z',
          updatedAt: '2023-11-03T09:58:40.546Z',
        },
      ],
      emoji: null,
      author: {
        id: 'e93d2e00-5ca9-4384-822e-6490047fb1f4',
        username: '나비스',
        profileImage: [
          {
            id: 9,
            url: 나비스,
            userId: 'e93d2e00-5ca9-4384-822e-6490047fb1f4',
            createdAt: '2023-11-03T09:16:15.155Z',
          },
        ],
      },
    },
  ],
  message: '성공',
  status: 200,
  pageInfo: {
    totalItem: 1,
    totalPage: 1,
    currentPage: 1,
    limit: 8,
  },
});

mock.onGet('/users/allUser?page=1&limit=8').reply(200, {
  data: [
    {
      id: '082ea72f-bfef-499c-9790-2e5db51bbb0a',
      username: '모코코',
      email: 'echk1111@naver.com',
      description: '',
      profileImage: [
        {
          id: 27,
          url: 'fileUpload/1699004858769.png',
          userId: '082ea72f-bfef-499c-9790-2e5db51bbb0a',
          createdAt: '2023-11-03T09:47:38.783Z',
        },
      ],
      createdAt: '2023-11-03T09:47:12.602Z',
      updatedAt: '2023-11-03T09:47:12.602Z',
      isFriend: false,
      latestEmoji: '😶',
    },
    {
      id: '0c9e78e1-0387-47f3-b0cf-70d58771c345',
      username: '쿠쿠다스',
      email: 'znznektm@naver.com',
      description: '야옹',
      profileImage: [
        {
          id: 19,
          url: 'fileUpload/1699003742464.jpg',
          userId: '0c9e78e1-0387-47f3-b0cf-70d58771c345',
          createdAt: '2023-11-03T09:29:02.488Z',
        },
      ],
      createdAt: '2023-11-03T09:28:32.706Z',
      updatedAt: '2023-11-03T09:28:32.706Z',
      isFriend: false,
      latestEmoji: '🤣',
    },
    {
      id: '10bd8192-87e6-4d29-b113-394c797a3635',
      username: '이창근',
      email: '1010hy@naver.com',
      description: '',
      profileImage: [
        {
          id: 34,
          url: 'fileUpload/1699005267185.png',
          userId: '10bd8192-87e6-4d29-b113-394c797a3635',
          createdAt: '2023-11-03T09:54:27.195Z',
        },
      ],
      createdAt: '2023-11-03T09:54:03.896Z',
      updatedAt: '2023-11-03T09:54:03.896Z',
      isFriend: false,
      latestEmoji: '😰',
    },
    {
      id: '14538792-86f4-407c-92fd-c1a2e571283e',
      username: '팔기',
      email: 'vkfrl@naver.com',
      description: null,
      profileImage: [],
      createdAt: '2023-11-03T13:30:34.470Z',
      updatedAt: '2023-11-03T13:30:34.470Z',
      isFriend: false,
      latestEmoji: '😙',
    },
    {
      id: '14749103-8063-4cac-a320-988628581df9',
      username: '현',
      email: 'momo33559@naver.com',
      description: '하이용',
      profileImage: [
        {
          id: 51,
          url: 'fileUpload/1699072414303.jpeg',
          userId: '14749103-8063-4cac-a320-988628581df9',
          createdAt: '2023-11-04T04:33:34.314Z',
        },
      ],
      createdAt: '2023-11-04T04:31:37.174Z',
      updatedAt: '2023-11-04T04:31:37.174Z',
      isFriend: false,
      latestEmoji: '🥰',
    },
    {
      id: '1670b871-fcdb-4e69-b08a-186800499a02',
      username: '정아현',
      email: 'jah512@naver.com',
      description: '안녕하세요',
      profileImage: [
        {
          id: 44,
          url: 'fileUpload/1699015260464.jpg',
          userId: '1670b871-fcdb-4e69-b08a-186800499a02',
          createdAt: '2023-11-03T12:41:00.474Z',
        },
      ],
      createdAt: '2023-11-03T05:34:40.361Z',
      updatedAt: '2023-11-03T05:34:40.361Z',
      isFriend: true,
      latestEmoji: '😙',
    },
    {
      id: '1e194aed-0398-4a5d-a2b2-fb514c14e1a7',
      username: '엘리스',
      email: 'dpffltmdla@naver.com',
      description: null,
      profileImage: [],
      createdAt: '2023-11-03T13:25:43.227Z',
      updatedAt: '2023-11-03T13:25:43.227Z',
      isFriend: false,
      latestEmoji: '🥰',
    },
    {
      id: '2ee491b9-9ab8-49e6-8b4e-0f3221c95ba4',
      username: '카리나',
      email: 'test0@test.com',
      description: '로켓펀',
      profileImage: [
        {
          id: 31,
          url: 'fileUpload/1699005093280.png',
          userId: '2ee491b9-9ab8-49e6-8b4e-0f3221c95ba4',
          createdAt: '2023-11-03T09:51:33.310Z',
        },
      ],
      createdAt: '2023-11-03T09:44:53.369Z',
      updatedAt: '2023-11-03T09:44:53.369Z',
      isFriend: false,
      latestEmoji: '😠',
    },
  ],
  message: '성공',
  status: 200,
  pageInfo: {
    totalItem: 48,
    totalPage: 6,
    currentPage: 1,
    limit: 8,
  },
});

mock.onGet('/users/allUser?page=2&limit=8').reply(200, {
  data: [
    {
      id: '6625be8e-5094-4bd9-938e-bb8647572e40',
      username: '레서판다',
      email: 'eeee@ee.com',
      description: '',
      profileImage: [
        {
          id: 33,
          url: 'fileUpload/1699005149489.png',
          userId: '6625be8e-5094-4bd9-938e-bb8647572e40',
          createdAt: '2023-11-03T09:52:29.500Z',
        },
      ],
      createdAt: '2023-11-03T09:51:57.261Z',
      updatedAt: '2023-11-03T09:51:57.261Z',
      isFriend: false,
      latestEmoji: '🤣',
    },
    {
      id: '739c9baa-9e3b-4a4a-bd57-a05271d29d61',
      username: '윈터',
      email: 'test1@test.com',
      description: '아머멘터',
      profileImage: [
        {
          id: 35,
          url: 'fileUpload/1699005334348.png',
          userId: '739c9baa-9e3b-4a4a-bd57-a05271d29d61',
          createdAt: '2023-11-03T09:55:34.360Z',
        },
      ],
      createdAt: '2023-11-03T09:54:08.907Z',
      updatedAt: '2023-11-03T09:54:08.907Z',
      isFriend: false,
      latestEmoji: '',
    },
    {
      id: '7a62e519-582c-4ef3-8f30-926e14eeff38',
      username: '이두나',
      email: 'doona@naver.com',
      description: '두나두나',
      profileImage: [
        {
          id: 39,
          url: 'fileUpload/1699006039043.png',
          userId: '7a62e519-582c-4ef3-8f30-926e14eeff38',
          createdAt: '2023-11-03T10:07:19.055Z',
        },
      ],
      createdAt: '2023-11-03T10:05:37.623Z',
      updatedAt: '2023-11-03T10:05:37.623Z',
      isFriend: true,
      latestEmoji: '🥰',
    },
    {
      id: '821b2bae-4f69-4fc4-90dc-1f41280dd114',
      username: 'ae윈터',
      email: 'test7@test.com',
      description: '아머멘터',
      profileImage: [
        {
          id: 50,
          url: 'fileUpload/1699039599609.png',
          userId: '821b2bae-4f69-4fc4-90dc-1f41280dd114',
          createdAt: '2023-11-03T19:26:39.623Z',
        },
      ],
      createdAt: '2023-11-03T10:59:34.615Z',
      updatedAt: '2023-11-03T10:59:34.615Z',
      isFriend: false,
      latestEmoji: '😐',
    },
    {
      id: '8555b20c-3790-466c-94d9-0e30d2d46243',
      username: '샘플',
      email: 'toavmf@naver.com',
      description: '거짓 사과',
      profileImage: [
        {
          id: 20,
          url: 'fileUpload/1699003846128.jpg',
          userId: '8555b20c-3790-466c-94d9-0e30d2d46243',
          createdAt: '2023-11-03T09:30:46.150Z',
        },
      ],
      createdAt: '2023-11-03T09:30:17.810Z',
      updatedAt: '2023-11-03T09:30:17.810Z',
      isFriend: false,
      latestEmoji: '😑',
    },
    {
      id: '8810c24c-88d7-4084-8c94-3b5286781e8d',
      username: '엔씨다이노스',
      email: 'nc@naver.com',
      description: '한국시리즈 가즈아',
      profileImage: [
        {
          id: 36,
          url: 'fileUpload/1699005405535.png',
          userId: '8810c24c-88d7-4084-8c94-3b5286781e8d',
          createdAt: '2023-11-03T09:56:45.544Z',
        },
      ],
      createdAt: '2023-11-03T09:55:24.073Z',
      updatedAt: '2023-11-03T09:55:24.073Z',
      isFriend: false,
      latestEmoji: '😑',
    },
    {
      id: '892ea96c-ffa6-4f97-8e66-751c445460c0',
      username: 'doosan',
      email: 'doosan@bears.com',
      description: '보이니 마이 하트',
      profileImage: [
        {
          id: 21,
          url: 'fileUpload/1699004212364.png',
          userId: '892ea96c-ffa6-4f97-8e66-751c445460c0',
          createdAt: '2023-11-03T09:36:52.372Z',
        },
      ],
      createdAt: '2023-11-03T09:11:32.119Z',
      updatedAt: '2023-11-03T09:11:32.119Z',
      isFriend: true,
      latestEmoji: '🤣',
    },
    {
      id: '9616ce3a-f187-486c-877f-f75c594dcc5b',
      username: '가짜',
      email: 'rkWK@naver.com',
      description: '진짜',
      profileImage: [
        {
          id: 18,
          url: 'fileUpload/1699003640357.jpg',
          userId: '9616ce3a-f187-486c-877f-f75c594dcc5b',
          createdAt: '2023-11-03T09:27:20.370Z',
        },
      ],
      createdAt: '2023-11-03T09:26:54.777Z',
      updatedAt: '2023-11-03T09:26:54.777Z',
      isFriend: true,
      latestEmoji: '🤮',
    },
  ],
  message: '성공',
  status: 200,
  pageInfo: {
    totalItem: 48,
    totalPage: 6,
    currentPage: 3,
    limit: 8,
  },
});

mock
  .onGet('/diary/views/users?select=all&page=1&limit=8&emotion=all')
  .reply(200, {
    data: [
      {
        id: '2a19c241-3efb-4064-b14d-07f9845e6441',
        authorId: 'c6344003-47b7-41bf-8ada-baab819aa36e',
        createdDate: '2023-11-04T00:00:00.000Z',
        title: '너무 슬프다',
        content: '너무 슬프다 너무 슬프다 너무 슬프다 ㅜㅜ',
        is_public: 'all',
        emoji: '😢',
        emotion: '슬픔',
        favoriteCount: 0,
        audioUrl:
          'https://rr3---sn-cnoa-h55z.googlevideo.com/videoplayback?expire=1699077601&ei=gIlFZY_iOvWOvcAP38-LoAg&ip=34.64.87.254&id=o-AMFVVbO_J0oP-NzgVjG28jd8soHYku9zIeWodWM_6HX2&itag=251&source=youtube&requiressl=yes&mh=ts&mm=31%2C26&mn=sn-cnoa-h55z%2Csn-c0q7lnse&ms=au%2Conr&mv=m&mvi=3&pcm2cms=yes&pl=20&initcwndbps=475000&spc=UWF9fwL1FkZ0_g30liRokso13zxT2YRWU6tHuVsx7g&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=3zQ2wcjycIrHlICuXg5NhtQP&gir=yes&clen=49628004&dur=2892.821&lmt=1652711587974607&mt=1699055587&fvip=3&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=5318224&n=otCBgclegAGtFw&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRgIhAI19tONWCWVHIKnUgWnnDrx8Mr0mzti6ZAeuODnov9XQAiEAmPzyyzMS1CmGgsQgC-Hw7n7gpL3AM_BI0cOSyyXihBs%3D&sig=ANLwegAwRQIgD1Pa-k_7o1je3n2_Nv9mpBIoWrUsV6EuDkdJBhcJcDcCIQCLjHw2577GYGRUmhZwRM6maancxt0uJ4jYVxc-1xJPrw%3D%3D',
        author: {
          id: 'c6344003-47b7-41bf-8ada-baab819aa36e',
          username: 'ae닝닝',
          email: 'test5@test.com',
          profileImage: [
            {
              id: 48,
              url: 'fileUpload/1699039124221.png',
              userId: 'c6344003-47b7-41bf-8ada-baab819aa36e',
              createdAt: '2023-11-03T19:18:44.242Z',
            },
          ],
        },
      },
      {
        id: 'e6806ebc-0d1a-41b9-bd29-125335e76910',
        authorId: '97d64519-395c-49f6-b1ef-3395fadcddbb',
        createdDate: '2023-11-04T00:00:00.000Z',
        title: '닭발',
        content:
          '닭발이 너무 먹고싶다\r\n왜 이시간만 되면 야식이 땡기는걸까...',
        is_public: 'all',
        emoji: '😢',
        emotion: '슬픔',
        favoriteCount: 2,
        audioUrl:
          'https://rr3---sn-ogueln66.googlevideo.com/videoplayback?expire=1699045205&ei=9QpFZcDzLs_V2roPrcG1qA4&ip=2606%3A40%3A1b3e%3A96f%3A0%3A0%3A462%3A152d&id=o-AA-9DLxjBO2-y7e0h6XnCKEH2mk4n_WXfHyqcqkBkYgj&itag=251&source=youtube&requiressl=yes&mh=ts&mm=31%2C29&mn=sn-ogueln66%2Csn-ogul7n7k&ms=au%2Crdu&mv=m&mvi=3&pl=46&initcwndbps=788750&spc=UWF9fwvm92kGpgx45AlqSEdXB-CIjMXycH-Utcz5rA&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=EiBMvAYr7j0PVT0YBv2XJdQP&gir=yes&clen=49628004&dur=2892.821&lmt=1652711587974607&mt=1699022963&fvip=2&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=5318224&n=3YbNjoG7lfrdCQ&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIgHwtY2J_FdBSwDICQf6jewEe51ESnjCosUoHVWLX7TkwCIQCGRR3sMfNmcWO_s-KiWwsYg1AP9WuIObiQ1pRt6YHmAQ%3D%3D&sig=ANLwegAwRQIhAKYfAHxDheGKa7YwpKvEGGCgnM1pa_aRnp6ei2Y0Ju0aAiBX-cAKciY38TAk1MlTeI_mkL3r-UxVYybd2vf6XPUWLQ%3D%3D',
        author: {
          id: '97d64519-395c-49f6-b1ef-3395fadcddbb',
          username: 'ssg',
          email: 'ssg@landers.com',
          profileImage: [
            {
              id: 46,
              url: 'fileUpload/1699019385218.png',
              userId: '97d64519-395c-49f6-b1ef-3395fadcddbb',
              createdAt: '2023-11-03T13:49:45.261Z',
            },
          ],
        },
      },
      {
        id: '88866387-1fa3-40eb-8542-b6258a4760ca',
        authorId: 'a692f84a-6914-4153-ba3c-299dd07aca46',
        createdDate: '2023-11-04T00:00:00.000Z',
        title: '식겁',
        content:
          '와 골목에 버려진 마네킹보고\r\n사람인줄\r\n겁나 깜짝 놀랐네\r\n간떨어질 뻔..',
        is_public: 'all',
        emoji: '😶',
        emotion: '중립',
        favoriteCount: 1,
        audioUrl:
          'https://rr1---sn-ogul7ne6.googlevideo.com/videoplayback?expire=1699045216&ei=AAtFZfqYEvq1vcAPibiWqAU&ip=2606%3A40%3A1b3e%3A96f%3A0%3A0%3A462%3A152d&id=o-AHj5Zh7_VRKqveMTXGXRNCa9HJsjOZkscXKSx6FCs-pD&itag=251&source=youtube&requiressl=yes&mh=z1&mm=31%2C26&mn=sn-ogul7ne6%2Csn-p5qlsndz&ms=au%2Conr&mv=m&mvi=1&pl=46&initcwndbps=788750&spc=UWF9f8QTpxAUuTY2oRSs5p--mXTlZ9ceoazcvEk1cg&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=1sWR9qgPYCIxo5GO4RDN6yIP&gir=yes&clen=164047251&dur=10361.941&lmt=1638716831010046&mt=1699022963&fvip=4&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=5432434&n=2Lme2do2o7H1ag&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRAIgW2LqaWoi9t08IKl2ZBWVPDK-NeXVyIk7xGk0tj9kQMQCIFe_gPgxY6Gk2F8zMMBFraQB6Krghwf4jhGW149yEUHL&sig=ANLwegAwRQIhAPtYIpkowdAgqOlPwZcFDAxOyVUWTO4yWZAstwo1vcQNAiA_MRKfR_N1r-XP83ZtaK4cdqRSZp9icmEMKArlqnTqNQ%3D%3D',
        author: {
          id: 'a692f84a-6914-4153-ba3c-299dd07aca46',
          username: 'kia',
          email: 'kia@tigers.com',
          profileImage: [
            {
              id: 14,
              url: 'fileUpload/1699003342301.png',
              userId: 'a692f84a-6914-4153-ba3c-299dd07aca46',
              createdAt: '2023-11-03T09:22:22.325Z',
            },
          ],
        },
      },
      {
        id: '1b76c04a-0bb2-40ff-8dd1-766577d11cc3',
        authorId: 'f6586504-20dc-4a66-9a74-c48d5e59b332',
        createdDate: '2023-11-04T00:00:00.000Z',
        title: '으악',
        content: '재입대하는 꿈을 꿨다.',
        is_public: 'all',
        emoji: '😙',
        emotion: '행복 : 🥰',
        favoriteCount: 1,
        audioUrl: null,
        author: {
          id: 'f6586504-20dc-4a66-9a74-c48d5e59b332',
          username: '테스트',
          email: 'test@test.co',
          profileImage: [],
        },
      },
      {
        id: '5ef7e1fd-6bac-4b32-8319-26baab99f935',
        authorId: '739c9baa-9e3b-4a4a-bd57-a05271d29d61',
        createdDate: '2023-11-04T00:00:00.000Z',
        title: '귀엽네요',
        content: '여기 서비스 너무 놀라워요',
        is_public: 'all',
        emoji: '🥰',
        emotion: '행복',
        favoriteCount: 1,
        audioUrl:
          'https://rr2---sn-cnoa-h55z.googlevideo.com/videoplayback?expire=1699077602&ei=golFZZn9Kuyy2roPye6SuAQ&ip=34.64.87.254&id=o-AL5SAvgPwMrml6bFzczq7WcfjHgI-IJyv-b5RLe9rCn_&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-cnoa-h55z%2Csn-c0q7lnsl&ms=au%2Conr&mv=m&mvi=2&pl=20&initcwndbps=475000&spc=UWF9f0tUj5SVg2OLsE4qTLXPn6wDjbRhqQxKY7j4wQ&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=LMtQ_z5grhves8WMvjre8ysP&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699055587&fvip=3&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=QsE7Bm5mHl1Dkg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRgIhAMMUc-mcoV3Txq_Mme1cpkbJNTK6L-3CgdsQTwj25dJoAiEA44fhUrzz8Djxt7c90BqzdePkrUAKfvlDuvvWFNxwF9M%3D&sig=ANLwegAwRQIgF2_0G_NH6OCS4gngdku1pFaQA0M2RSjBET-8V92O7OYCIQCaJhKORploRYzTJ1Sb3DWU1sjSHCR2ftTj9GCm1PP9eg%3D%3D',
        author: {
          id: '739c9baa-9e3b-4a4a-bd57-a05271d29d61',
          username: '윈터',
          email: 'test1@test.com',
          profileImage: [
            {
              id: 35,
              url: 'fileUpload/1699005334348.png',
              userId: '739c9baa-9e3b-4a4a-bd57-a05271d29d61',
              createdAt: '2023-11-03T09:55:34.360Z',
            },
          ],
        },
      },
      {
        id: '2277b3e4-722f-4e1e-99b3-68886a51d182',
        authorId: '8810c24c-88d7-4084-8c94-3b5286781e8d',
        createdDate: '2023-11-03T00:00:00.000Z',
        title: '23 한국시리즈 우승 팀은!!!',
        content: '23 한국시리즈 우승은 nc지 ㅎㅎ\r\n반박 시 응원팀 내년 꼴등',
        is_public: 'all',
        emoji: '😑',
        emotion: '중립',
        favoriteCount: 5,
        audioUrl:
          'https://rr5---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023610&ei=mrZEZfHDFLm3s8IPha29qA4&ip=122.37.232.34&id=o-AMGX30gLBGnI2apMWNisTX0JtprtVgZu4GbycjoivDyY&itag=251&source=youtube&requiressl=yes&mh=Ty&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=5&pcm2cms=yes&pl=21&initcwndbps=1548750&spc=UWF9f82BI1DPm7QznoKC9OP5QwSY3uYysCwcSw_pjw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=PF9-H1CjGNM7ZNa3iA7Ev8QP&gir=yes&clen=40604138&dur=2507.901&lmt=1660082827981577&mt=1699001586&fvip=3&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=5432434&n=s5Cv8_97ZtAT1w&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpcm2cms%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRgIhAM7GgrEnf2XRKnT0PD1KRCajCXYkWykt8mIvqa2aZXF7AiEAkqoxSYNg89J1PTFPOdPj7fL_9SK7phG46Sqn7oQcTO8%3D&sig=ANLwegAwRgIhAODVM9zshrFpzEKhO5wr3nnPvV8sLLpKcqkb2ReYs-diAiEAozZ61QlLcoqy27k0J4DPRR6nOAHBFuBBsWDJmHdegf8%3D',
        author: {
          id: '8810c24c-88d7-4084-8c94-3b5286781e8d',
          username: '엔씨다이노스',
          email: 'nc@naver.com',
          profileImage: [
            {
              id: 36,
              url: 'fileUpload/1699005405535.png',
              userId: '8810c24c-88d7-4084-8c94-3b5286781e8d',
              createdAt: '2023-11-03T09:56:45.544Z',
            },
          ],
        },
      },
      {
        id: '1d7c65ee-5403-4e73-bd54-2727486780c4',
        authorId: 'bf5f09f2-dfe1-406f-9639-deba4cce4cfd',
        createdDate: '2023-11-03T00:00:00.000Z',
        title: '컹컹컹',
        content: '멍멍 왈왈 커커커컹 크르르르릉',
        is_public: 'all',
        emoji: '🤣',
        emotion: '행복',
        favoriteCount: 7,
        audioUrl:
          'https://rr4---sn-ab02a0nfpgxapox-bh2zr.googlevideo.com/videoplayback?expire=1699023607&ei=l7ZEZfDvLeq02roPpcyA-Ac&ip=122.37.232.34&id=o-AIrd4FgnDEhfxCZ6Z18ny121GWLtuey4_f2ZNcx5dndk&itag=251&source=youtube&requiressl=yes&mh=N0&mm=31%2C26&mn=sn-ab02a0nfpgxapox-bh2zr%2Csn-un57sne7&ms=au%2Conr&mv=m&mvi=4&pl=21&pcm2=yes&initcwndbps=1548750&spc=UWF9f1Dy1Mz3-yxgCxI1lEXzBfnaIO2r-5EjVRzSxw&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=FfIlOnoL1w-5H02eRVCQ4j0P&gir=yes&clen=30737918&dur=1804.361&lmt=1698460162021231&mt=1699001586&fvip=5&keepalive=yes&fexp=24007246&beids=24350018&c=WEB&txp=4532434&n=YWcDgAVv-yfh7g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cpcm2%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AM8Gb2swRQIhAMo8kbX9o9pl5papSXGIlcshofClVmdCgdHLqqsofoFNAiAnVfKzEMfxo4jt7EFqb2zJKwP3TLIKkZzbl-jwAyMKUw%3D%3D&sig=ANLwegAwRAIgLUEdfOqWnqt-ENv2v9CBt1cld63BJG0Xzmzvfy2_H-gCIC13Hj8TeNqEAmQZLNEjgwp8_dqjzjBBot9kdHpg1txy',
        author: {
          id: 'bf5f09f2-dfe1-406f-9639-deba4cce4cfd',
          username: '왈왈',
          email: 'wlghwk0509@naver.com',
          profileImage: [
            {
              id: 29,
              url: 'fileUpload/1699005022805.png',
              userId: 'bf5f09f2-dfe1-406f-9639-deba4cce4cfd',
              createdAt: '2023-11-03T09:50:22.811Z',
            },
          ],
        },
      },
      {
        id: '2d502a80-f383-4602-91ac-d12449be59be',
        authorId: 'ca07cf68-5aa6-4f45-902c-662f9c8a5b6f',
        createdDate: '2023-11-03T00:00:00.000Z',
        title: '나는 말이지',
        content:
          '안녕 나는 ae-카리나야!\r\n누구보다 강력한 로켓 펀치가 가능하지',
        is_public: 'all',
        emoji: '😙',
        emotion: '행복',
        favoriteCount: 1,
        audioUrl:
          'https://rr2---sn-cnoa-h55z.googlevideo.com/videoplayback?expire=1699056003&ei=IzVFZZPwB9WqvcAPn5aN8AM&ip=34.64.87.254&id=o-AIS7ffHPHUPLtIaWH9p5UFpZ8GCZH6e44AIqEJIOh35a&itag=251&source=youtube&requiressl=yes&mh=VS&mm=31%2C26&mn=sn-cnoa-h55z%2Csn-c0q7lnly&ms=au%2Conr&mv=u&mvi=2&pl=20&spc=UWF9f4el4n3dyLPDsgg14FtKzRQ58xDPblUWiDVVcQ&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=H1d9fVx21CTRthzf0_nS7r4P&gir=yes&clen=65672379&dur=3664.501&lmt=1692189908064632&mt=1699034017&fvip=1&keepalive=yes&fexp=24007246&beids=24472446&c=WEB&txp=5432434&n=a8OHmPyujig9Vg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AM8Gb2swRQIgKkSa_OjcwtrTZ4UqTOU0-bsjw1py1Fs9qChslUhlunQCIQCelHW4BeLCtrKDrMwgWAbdo_l8n9z4l80NoA0Zeoazqg%3D%3D&sig=ANLwegAwRQIhAJURirc3ZRYbovrG-zOM3UOk_JDsTmTmOXfIEFsbM8GBAiBE_GNCIQEds2TL4cASuYgJ7bRd78q_X_HMSstjLQd1CQ%3D%3D',
        author: {
          id: 'ca07cf68-5aa6-4f45-902c-662f9c8a5b6f',
          username: 'ae카리나',
          email: 'test4@test.com',
          profileImage: [
            {
              id: 47,
              url: 'fileUpload/1699038495347.png',
              userId: 'ca07cf68-5aa6-4f45-902c-662f9c8a5b6f',
              createdAt: '2023-11-03T19:08:15.362Z',
            },
          ],
        },
      },
    ],
    message: '성공',
    status: 200,
    pageInfo: {
      totalItem: 54,
      totalPage: 7,
      currentPage: 1,
      limit: 8,
    },
  });

mock
  .onGet('/diary/emotions?year=2023&month=10')
  .reply(200, { data: [], message: '검색결과가 없습니다.', status: 204 });
