import React, { useEffect } from 'react';

import ImageComponent from '../../../components/ImageComponent';
import { useGetUserData } from '../../../api/get/useGetUserData';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './UserId.UserCard.module.scss';
import getUserId from '../../../utils/localStorageHandlers';
import { useSetRecoilState } from 'recoil';
import { toastState } from '../../../atoms/toastState';
import { usePostFriendReqMutation } from '../../../api/post/usePostFriendData';
import { QueryClient } from '@tanstack/react-query';
interface UserInfoType {
  id: string;
  username: string;
  email: string;
  description: string;
  profileImage: string;
  latestEmoji: string;
  isFriend: boolean;
}

const UserCard = () => {
  const location = useLocation();

  const { data: userData, isFetching } = useGetUserData({
    user_id: location.pathname.split('/')[2],
  });

  const queryClient = new QueryClient();
  const postMutation = usePostFriendReqMutation(queryClient);

  // 로그인 사용자의 경우 마이페이지로 이동

  const handleFriendBtnClick = () => {
    postMutation.mutate({ id: userData.id });
  };

  return (
    <div className={styles.userCardContainer}>
      <ImageComponent
        src={
          userData.profileImage?.length !== 0
            ? userData.profileImage.at(-1)?.url
            : null
        }
        alt={`${userData.username}의 프로필사진`}
      />
      {isFetching ? (
        <div>로딩중</div>
      ) : (
        <div className={styles.content}>
          <div>
            <label>유저 이름</label>
            <h2>{userData.username}</h2>
          </div>
          <div>
            <label>유저 소개</label>
            <h3>{userData.description}</h3>
          </div>
          <div>
            <label>유저 상태</label>
            <h4>{userData.latestEmoji}</h4>
          </div>
          {userData.isFriend ? (
            <button className="doneBtn">채팅보내기</button>
          ) : (
            <button className="doneBtn" onClick={handleFriendBtnClick}>
              친구추가
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
