import { Request, Response, NextFunction } from "express";
import {
  weAreFriends,
  createFriends,
  friendRequestList,
  acceptFriend,
  rejectFriend,
  getMyFriends,
  deleteFriend,
} from "../services/friendService";
import { IRequest } from "types/user";

/** @description 친구 요청 */
/** @Tag(name = "book service", description = "the book API with description tag annotation") */
export const friendRequest = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const requestId = req.params.userId;

    if (userId === requestId) {
      return res
        .status(400)
        .json({ message: "나 자신과는 친구가 될 수 없어!" });
    }
    const alreadyFriends = await weAreFriends(userId, requestId);
    if (alreadyFriends) {
      return res.status(400).json({ message: "이미 요청 했거나 우린 친구!" });
    }
    const existingFriendRequest = await weAreFriends(requestId, userId);
    if (existingFriendRequest) {
      return res.status(400).json({ message: "이미 요청 했거나 우린 친구!" });
    }
    const request = await createFriends(userId, requestId);
    res.status(200).json({ message: "친구 요청 완료", request });
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

/** @description 친구 요청 목록 */
export const requestList = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const friendRequest = await friendRequestList(userId);
    res.status(200).json({ message: "친구 요청 리스트", friendRequest });
    console.log(friendRequest);
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

/** @description 친구 수락 */
export const friendAccept = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const requestId = req.params.userId;
    const accept = await acceptFriend(userId, requestId);
    res.status(200).json({ message: "친구 수락", accept });
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

/** @description 친구 거절 */
export const friendReject = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const requestId = req.params.userId;
    const reject = await rejectFriend(userId, requestId);
    res.status(200).json({ message: "친구 거절", reject });
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

/** @description 친구 목록 */
export const getFriends = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const page: number | null =
      req.query.page !== undefined ? Number(req.query.page) : null;
    const limit: number | null =
      req.query.limit !== undefined ? Number(req.query.limit) : null;

    const userId = req.user.id;
    const friendsList = await getMyFriends(userId, page, limit);
    res.status(200).json({ message: "친구 목록", friendsList });
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

/** @description 친구 삭제 */
export const friendDelete = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const friendId = req.params.userId;
    const dropFriend = await deleteFriend(userId, friendId);
    res.status(200).json({ message: "친구 삭제", dropFriend });
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};
