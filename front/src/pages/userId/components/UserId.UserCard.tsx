import React from 'react';

import ImageComponent from '../../../components/ImageComponent';
import { useGetUserData } from '../../../api/get/useGetUserData';
import { useLocation } from 'react-router-dom';
import styles from './UserId.UserCard.module.scss';
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

  return (
    <div className={styles.userCardContainer}>
      <ImageComponent src={null} alt={`유저의 프로필사진`} />

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
            <button className="doneBtn">친구추가</button>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
