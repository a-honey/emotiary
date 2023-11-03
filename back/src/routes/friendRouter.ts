import { jwtAuthentication } from '../middlewares/authenticateJwt';
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
import { Router } from 'express';
import { wrapAsyncController } from '../utils/wrapper';
const friendRouter = Router();

/** @description 친구 요청 */
friendRouter.post(
  '/req/:userId',
  jwtAuthentication,
  wrapAsyncController(friendRequest),
);

/** @description 보낸 친구 요청 리스트 */
friendRouter.get(
  '/sent/list',
  jwtAuthentication,
  wrapAsyncController(sentList),
);

/** @description 요청 취소 */
friendRouter.delete(
  '/req/drop/:userId',
  jwtAuthentication,
  wrapAsyncController(requestCancel),
);

/** @description 받은 친구 요청 리스트 */
friendRouter.get(
  '/received/list',
  jwtAuthentication,
  wrapAsyncController(receivedList),
);

/** @description 친구 수락 */
friendRouter.post(
  '/accept/:userId',
  jwtAuthentication,
  wrapAsyncController(friendAccept),
);

/** @description 친구 거절 */
friendRouter.delete(
  '/reject/:userId',
  jwtAuthentication,
  wrapAsyncController(friendReject),
);

/** @description 친구 목록 */
friendRouter.get(
  '/list',
  jwtAuthentication,
  wrapAsyncController(getFriends),
);

/** @description 친구 삭제 */
friendRouter.delete(
  '/drop/:userId',
  jwtAuthentication,
  wrapAsyncController(friendDelete),
);

export default friendRouter;
