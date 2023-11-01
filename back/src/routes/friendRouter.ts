import { Router } from 'express';
import {
  friendRequest,
  sentList,
  receivedList,
  requestCancel,
  friendAccept,
  friendReject,
  getFriends,
  friendDelete,
} from '../controllers/friendController';
import { jwtAuthentication } from '../middlewares/authenticateJwt';
const friendRouter = Router();

//TODO wrapper 감싸기
/** @description 친구 요청 */
friendRouter.post('/req/:userId', jwtAuthentication, friendRequest);

/** @description 보낸 친구 요청 리스트 */
friendRouter.get('/sent/list', jwtAuthentication, sentList);

/** @description 요청 취소 */
friendRouter.delete('/req/drop/:userId', jwtAuthentication, requestCancel);

/** @description 받은 친구 요청 리스트 */
friendRouter.get('/received/list', jwtAuthentication, receivedList);

/** @description 친구 수락 */
friendRouter.post('/accept/:userId', jwtAuthentication, friendAccept);

/** @description 친구 거절 */
friendRouter.delete('/reject/:userId', jwtAuthentication, friendReject);

/** @description 친구 목록 */
friendRouter.get('/list', jwtAuthentication, getFriends);

/** @description 친구 삭제 */
friendRouter.delete('/drop/:userId', jwtAuthentication, friendDelete);

export default friendRouter;
