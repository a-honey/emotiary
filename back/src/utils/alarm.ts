import cron from 'node-cron';
import { sendEmail } from './email';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const sendAlarm = async () => {
  cron.schedule('0 0 21 * * *', async () => {
    console.log('!!일기 알람 스케쥴링!!');

    const needKeepDiaryUser = await prisma.user.findMany({
      select: {
        email: true,
        alarmSetting: true,
        Diary: {
          select: {
            createdDate: true,
          },
          orderBy: { createdDate: 'desc' },
        },
      },
    });

    const today = parseInt(
      new Date().toISOString().slice(0, 10).replace(/-/g, ''),
    );

    for (let user of needKeepDiaryUser) {
      if (user.Diary[0]) {
        const diaryLastWrite = parseInt(
          user.Diary[0].createdDate
            .toISOString()
            .slice(0, 10)
            .replace(/-/g, ''),
        );

        const daysSinceLastWrite = today - diaryLastWrite;

        // 홈페이지 링크 연결 필요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (daysSinceLastWrite >= user.alarmSetting) {
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
