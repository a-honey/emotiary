import { Response, NextFunction } from 'express';
import { IRequest } from 'types/request';
import {
  searchFavorite,
  addFavorite,
  deleteFavorite,
} from '../services/favoriteService';

export const favoriteSwitch = async (
  req: IRequest,
  res: Response,
  next: NextFunction,
) => {
  /* #swagger.tags = ['Favorite']
    #swagger.security = [{
      "bearerAuth": []
    }] 
    #swagger.summary = '좋아요'
  */
  // req를 통해 넘어온 diaryId
  const diary_id: string = req.params.diaryId;
  // 토큰에서 로그인 유저 id 추출
  const user_id = req.user.id;

  //params로 받은 일기 id와 추출한 유저 id를 이용하여 like table에 등록된 행이 있는지 확인
  const like = await searchFavorite(diary_id, user_id);

  //로그인 유저가 해당 게시물에 대해 like했던 데이터가 있다면 해당 like 데이터 삭제
  if (like) {
    await deleteFavorite(diary_id, user_id);
    return res
      .status(200)
      .json({ message: '해당 일기의 좋아요를 취소했어요.' });
    //로그인 유저가 해당 게시물에 대해 like했던 데이터가 없다면 like 데이터 추가
  } else {
    await addFavorite(diary_id, user_id);
    return res.status(200).json({ message: '해당 일기에 좋아요를 눌렀어요!' });
  }
};
