import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// 환경 변수에서 이메일 서비스, 사용자, 비밀번호를 가져옵니다.
const { email_service, user, pass } = process.env;

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: any,
): Promise<void> => {
  try {
    // 이메일을 전송하기 위한 transporter(전송자) 객체를 생성합니다.
    const transporter = nodemailer.createTransport({
      pool : true,
      maxConnections : 1,
      secure : false,
      requireTLS : true,
      tls : {
        rejectUnauthorized : false,
      },
      service: email_service,
      auth: {
        user: user,
        pass: pass,
      },
    });

    const mailOptions = {
      from: user,
      to,
      subject,
      text,
      html,
    };

    // 설정한 이메일 옵션을 사용하여 이메일을 전송합니다.
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};

export const generateRandomNumber = function (min : number, max : number) {
  const randNum = Math.floor(Math.random() * (max - min +1)) +min;

  return randNum;
}