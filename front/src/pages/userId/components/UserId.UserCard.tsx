import React from 'react';

import ImageComponent from '../../../components/ImageComponent';
import { useGetUserData } from '../../../api/get/useGetUserData';
import { useLocation } from 'react-router-dom';
import styles from './UserId.UserCard.module.scss';
import { useSetRecoilState } from 'recoil';
import { usePostFriendReqMutation } from '../../../api/post/usePostFriendData';
import { chatState } from '../../../atoms/chatState';

const INIIAL_USER_DATA = {
  id: '',
  username: '',
  email: '',
  description: '',
  profileImage: [{ url: '' }],
  latestEmoji: '',
  isFriend: false,
};

const UserCard = () => {
  const location = useLocation();

  const { data, isFetching } = useGetUserData({
    user_id: location.pathname.split('/')[2],
  });

  const userData = data ?? INIIAL_USER_DATA;

  const { id, username, description, profileImage, latestEmoji, isFriend } =
    userData;
  const postMutation = usePostFriendReqMutation();

  // 로그인 사용자의 경우 마이페이지로 이동

  const handleFriendBtnClick = () => {
    postMutation.mutate({ id: userData.id });
  };

  const setChatStateRecoil = useSetRecoilState(chatState);

  const handleChatUserIdAndUsername = () => {
    setChatStateRecoil({
      chatUserId: id,
      chatUsername: username,
      isOpenChatList: true,
      isOpenChatRoom: true,
    });
  };

  return (
    <div className={styles.userCardContainer}>
      <ImageComponent
        src={profileImage.at(-1)?.url ?? null}
        alt={`${username}의 프로필사진`}
      />
      {isFetching ? (
        <div>로딩중</div>
      ) : (
        <div className={styles.content}>
          <div>
            <label>유저 이름</label>
            <h2>{username}</h2>
          </div>
          <div>
            <label>유저 소개</label>
            <h3>{description}</h3>
          </div>
          <div>
            <label>유저 상태</label>
            <h4>{latestEmoji}</h4>
          </div>
          {isFriend ? (
            <button className="doneBtn" onClick={handleChatUserIdAndUsername}>
              채팅보내기
            </button>
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
