import { Request, Response, NextFunction } from 'express';
import {
  getAllMyRoom
} from '../services/chatService';
import { IRequest } from 'types/request';



export const AllMyRoom = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  /**
   * #swagger.tags = ['Friend']
   * #swagger.summary = '친구 요청 취소'
   */
  const userId = req.user.id;
  const roomList = await getAllMyRoom(userId);
  res.status(200).json(roomList);
};