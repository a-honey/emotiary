import "dotenv/config";
import { app } from "./src/app";

const PORT: number = parseInt(process.env.SERVER_PORT as string, 10) || 5001;

app.listen(PORT, () => {
  console.log(`✅ 정상적으로 서버를 시작하였습니다.  http://localhost:${PORT}`);
});
