import React from 'react';
import styles from './index.module.scss';
import { handleImgError } from '../../../utils/imgHandlers';
import { useNavigate } from 'react-router-dom';
import { useGetUsersData } from '../../../api/get/useGetUserData';

interface UserItemType {
  id: number;
  username: string;
  description: string;
  profileImage: string;
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
          data?.data?.map((item: UserItemType) => (
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

  const { id, profileImage, username, description } = data;

  return (
    <div
      className={styles.item}
      onClick={() => {
        navigator(`/user/${id}`);
      }}
    >
      <div>
        <img
          src={profileImage}
          alt={`${username}의 프로필사진`}
          onError={handleImgError}
        />
        <div className={styles.emoji}>😆</div>
      </div>
      <div className={styles.content}>
        <div>{username}</div>
        <div>{description}</div>
      </div>
      <button className="doneBtn">친구요청</button>
    </div>
  );
};
