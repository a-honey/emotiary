"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = __importDefault(require("./swagger/swagger-output.json"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const passport_1 = __importDefault(require("passport"));
const passport_2 = require("./passport-config/passport");
// import axios, { AxiosResponse } from "axios";
const app = (0, express_1.default)();
exports.app = app;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(passport_1.default.initialize());
const localStrategyInstance = passport_2.localStrategy;
const jwtStrategyInstance = passport_2.jwtStrategy;
passport_1.default.use('local', localStrategyInstance);
passport_1.default.use('jwt', jwtStrategyInstance);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// 유튜브
// function analyzeEmotion(): string {
//     const emotion: string = "sad";
//     return emotion;
// }
// const youtubeApiKey: string = "AIzaSyB1d787FFm4D9Qw8keqyrj0fCqkTE94hhg";
// async function searchMusic(emotion: string): Promise<any | null> {
//     try {
//         const searchQuery = `${emotion} music`;
//         console.log(`https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&type=video&q=${searchQuery}`);
//         const response: AxiosResponse = await axios.get(
//             `https://www.googleapis.com/youtube/v3/search?key=${youtubeApiKey}&part=snippet&type=video&q=${searchQuery}`
//         );
//         // API 응답 중에서 첫 번째 비디오 정보를 추출
//         const firstVideo = response.data.items[0];
//         if (!firstVideo) {
//             return null; // 검색 결과가 없는 경우 null을 반환하거나 다른 처리를 할 수 있습니다.
//         }
//         // 노래 정보를 객체로 반환
//         const musicData = {
//             title: firstVideo.snippet.title,
//             videoId: firstVideo.id.videoId,
//         };
//         return musicData;
//     } catch (error) {
//         console.error(error);
//         throw error;
//     }
// }
// app.post('/song', async (req: Request, res: Response) => {
//     try {
//         const emotion = analyzeEmotion();
//         const musicData = await searchMusic(emotion);
//         if (!musicData) {
//             res.status(404).json({ message: "No songs found." });
//         } else {
//             res.status(200).json(musicData);
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// });
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default, { explorer: true }));
app.get("/", (req, res) => {
    res.send("기본 페이지");
});
app.use("/users", userRouter_1.default);
//# sourceMappingURL=app.js.map