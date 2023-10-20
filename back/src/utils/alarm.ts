import cron from 'node-cron';
import { sendEmail } from './email';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 유저 설정에 따른 일기 작성 알림 메일 발송
export const sendAlarm = async () => {
  // 매일 21:00:00 스케쥴링 실행
  cron.schedule('0 0 21 * * *', async () => {
    console.log('!!일기 알람 스케쥴링!!');

    // 알림을 위한 각 유저 정보/개인 Diary 조회
    const needKeepDiaryUser = await prisma.user.findMany({
      select: {
        email: true,
        alarmSetting: true,
        Diary: {
          select: {
            createdAt: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    // 한국시간 반영하여 오늘 날짜 조회
    const offset = 1000 * 60 * 60 * 9;
    const koreaNow = new Date(new Date().getTime() + offset);
    const today = parseInt(
      koreaNow.toISOString().slice(0, 10).replace(/-/g, ''),
    );

    // 각 유저를 돌며 for문 실행
    for (let user of needKeepDiaryUser) {
      // 해당 유저가 작성한 Diary가 있는지 확인 없다면 pass 있다면 if 문 실행
      if (user.Diary[0]) {
        // 해당 유저의 최신 일기 작성일 조회
        const diaryCreatedTime = new Date(
          user.Diary[0].createdAt.getTime() + offset,
        );
        const diaryLastWrite = parseInt(
          diaryCreatedTime.toISOString().slice(0, 10).replace(/-/g, ''),
        );
        // 해당 최신일기와 오늘 일자 비교
        const daysSinceLastWrite = today - diaryLastWrite;

        console.log(daysSinceLastWrite);
        console.log(parseInt(user.alarmSetting));
        // daysSinceLastWrite가 유저별로 설정한 알림일수 이상일 경우 메일 발송
        if (daysSinceLastWrite >= parseInt(user.alarmSetting)) {
          await sendEmail(
            user.email,
            '[Emotiary] 오늘 하루는 어땟나요? ',
            ``,
            `<div style="text-align:center;">
              <p>오늘 하루도 수고많으셨어요!</p><br />
              <p>오늘 하루를 되짚어보며 일기로 기록해 보는건 어떨까요?</p><br />
              <a href="${process.env.SERVER_URL}" style="
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              background-color: #007BFF;
              color: white;
              text-decoration: none;
              border-radius: 5px;">오늘 하루 기록하러 가기</a>
            </div>`,
          );
        }
      }
    }
  });
};
