import 'dotenv/config';
import { app,server } from './src/app';
import { NextFunction, Request, Response } from 'express';


const PORT: number = parseInt(process.env.SERVER_PORT as string, 10) || 5001;

app.listen(PORT, () => {
  console.log(`✅ 정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});

// export const server = app.listen(PORT, () => {
//   console.log(`✅ 정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
// });

app.io.attach(server);

