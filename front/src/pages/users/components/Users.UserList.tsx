import React from 'react';
import styles from './index.module.scss';
import { handleImgError } from '../../../utils/imgHandlers';
import { useNavigate } from 'react-router-dom';
import { useGetUsersData } from '../../../api/get/useGetUserData';
import ImageComponent from '../../../components/ImageComponent';
import { instance } from '../../../api/instance';

interface UserItemType {
  id: number;
  username: string;
  description: string;
  profileImage: string;
  latestEmoji: string;
  isFriend: boolean;
}

const UserList = () => {
  const { data, isFetching } = useGetUsersData();

  console.log(data);
  return (
    <div className={styles.block}>
      <h2>유저 모아보기</h2>
      <div className={styles.nav}>
        <input type="checkbox" />
        <div>내 친구만 보기</div>
      </div>
      <div className={styles.listBlock}>
        {isFetching ? (
          <div>로딩중</div>
        ) : (
          data?.map((item: UserItemType) => (
            <UserItem data={item} key={item.id} />
          ))
        )}
      </div>
      <div>페이지네이션자리</div>
    </div>
  );
};

export default UserList;

const UserItem = ({ data }: { data: UserItemType }) => {
  const navigator = useNavigate();

  const { id, profileImage, username, description, latestEmoji, isFriend } =
    data;

  const handleFriendReqBtnClick = async () => {
    try {
      await instance.post(`/friend/req/${id}`);
      alert('친구요청완료');
    } catch {
      console.error('친구요청실패');
    }
  };

  return (
    <div
      className={styles.item}
      onClick={() => {
        navigator(`/user/${id}`);
      }}
    >
      <div>
        <ImageComponent src={profileImage} alt={`${username}의 프로필사진`} />
        <div className={styles.emoji}>{latestEmoji}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.name}>
          <div>{username}</div>
          {!isFriend && (
            <button
              className={`doneBtn ${styles.friendReqBtn}`}
              onClick={handleFriendReqBtnClick}
            >
              +
            </button>
          )}
        </div>
        <div>{description}</div>
      </div>
    </div>
  );
};
