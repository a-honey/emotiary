import { Request, Response, NextFunction } from 'express';
import {
  weAreFriends,
  createFriends,
  listRequestsSent,
  cancelRequest,
  listRequestsReceived,
  acceptFriend,
  rejectFriend,
  getMyFriends,
  deleteFriend,
} from '../services/friendService';
import { IRequest } from "types/user";

/** @description 친구 요청 */
/** @Tag(name = "book service", description = "the book API with description tag annotation") */
export const friendRequest = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  /**
   * #swagger.tags = ['Friend']
   * #swagger.summary = '친구 요청'
   */
    const userId = req.user.id;
    const requestId = req.params.userId;

    if (userId === requestId) {
      //TODO  throw generateError(400,message) 로 바꿔주기
      return res.status(400).json({ message: '셀프 친구 불가!' });
    }
    const alreadyFriends = await weAreFriends(userId, requestId);
    if (alreadyFriends) {
      return res.status(400).json({ message: '이미 요청 했거나 우린 친구!' });
    }
    const existingFriendRequest = await weAreFriends(requestId, userId);
    if (existingFriendRequest) {
      return res.status(400).json({ message: '이미 요청 했거나 우린 친구!' });
    }
    const request = await createFriends(userId, requestId);
    res.status(200).json(request);
};

/** @description 보낸 친구 요청 목록 */
export const sentList = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  /**
   * #swagger.tags = ['Friend']
   * #swagger.summary = '보낸 친구 요청 목록'
   */

  const userId = req.user.id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const friendRequest = await listRequestsSent(userId, page, limit);
  res.status(200).json(friendRequest);
};

/** @description 요청 취소 */
export const requestCancel = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  /**
   * #swagger.tags = ['Friend']
   * #swagger.summary = '친구 요청 취소'
   */
    const userId = req.user.id;
    const requestId = req.params.userId;
    const cancel = await cancelRequest(userId, requestId);
    res.status(200).json(cancel);
};



/** @description 받은 친구 요청 목록 */
export const receivedList = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  /**
   * #swagger.tags = ['Friend']
   * #swagger.summary = '받은 친구 요청 목록'
   */

  const userId = req.user.id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const friendRequest = await listRequestsReceived(userId, page, limit);
  res.status(200).json(friendRequest);
};

/** @description 친구 수락 */
export const friendAccept = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  /**
   * #swagger.tags = ['Friend']
   * #swagger.summary = '친구 수락'
   */

  const userId = req.user.id;
  const requestId = req.params.userId;
  const accept = await acceptFriend(userId, requestId);
  res.status(200).json(accept);
};

/** @description 친구 거절 */
export const friendReject = async (req : IRequest, res : Response, next : NextFunction) => {
  /**
   * #swagger.tags = ['Friend']
   * #swagger.summary = '친구 거절'
   */

  const userId = req.user.id;
  const requestId = req.params.userId;
  const reject = await rejectFriend(userId, requestId);
  res.status(200).json(reject);
};

/** @description 친구 목록 */
export const getFriends = async (req : IRequest, res : Response, next : NextFunction) => {
  /**
   * #swagger.tags = ['Friend']
   * #swagger.summary = '친구 목록'
   */

  const userId = req.user.id;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const friendsList = await getMyFriends(userId, page, limit);
  res.status(200).json(friendsList);
};

/** @description 친구 삭제 */
export const friendDelete = async (req : IRequest, res : Response, next : NextFunction) => {
  /**
   * #swagger.tags = ['Friend']
   * #swagger.summary = '친구 삭제'
   */

  const userId = req.user.id;
  const friendId = req.params.userId;
  const dropFriend = await deleteFriend(userId, friendId);
  res.status(200).json(dropFriend);
};
