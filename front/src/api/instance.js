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
