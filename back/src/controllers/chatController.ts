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
   * #swagger.tags = ['chat']
   * #swagger.summary = '챝킹룸 가져오기'
   */
  const chatPartnerId = req.user.id;
  const roomList = await getAllMyRoom(chatPartnerId);
  res.status(200).json(roomList);
};