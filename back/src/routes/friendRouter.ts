import { Router } from 'express';
import {
    friendRequest,
    requestList,
    friendAccept,
    friendReject,
    getFriends,
    friendDelete,
} from '../controllers/friendController';
import { jwtAuthentication } from '../middlewares/authenticateJwt';
const friendRouter = Router();

/** @description 친구 요청 */
friendRouter
    .post("/req/:userId",
        jwtAuthentication,
        friendRequest);


/** @description 친구 요청 리스트 */

friendRouter
    .get("/req/list",
        jwtAuthentication,
        requestList);


/** @description 친구 수락 */
friendRouter
    .post("/accept/:userId",
        jwtAuthentication,
        friendAccept);


/** @description 친구 거절 */
friendRouter
    .delete("/reject/:userId",
        jwtAuthentication,
        friendReject);


/** @description 친구 목록 */
friendRouter
    .get('/list',
        jwtAuthentication,
        getFriends);


/** @description 친구 삭제 */
friendRouter
    .delete("/drop/:userId",
        jwtAuthentication,
        friendDelete);

export default friendRouter;