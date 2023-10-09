import React from 'react';
import styles from './index.module.scss';
import { handleImgError } from '../../../utils/imgHandlers';
import { useNavigate } from 'react-router-dom';
import { useGetUsersData } from '../../../api/get/useGetUserData';

interface UserItemType {
  user_id: number;
  useremail: string;
  username: string;
  description: string;
  profileImage: string;
}

const UserList = () => {
  const fakeData = [
    {
      user_id: 1,
      useremail: 'user1@example.com',
      username: 'User 1',
      description: 'Description for User 1',
      profileImage: 'profile1.jpg',
    },
    {
      user_id: 2,
      useremail: 'user2@example.com',
      username: 'User 2',
      description: 'Description for User 2',
      profileImage: 'profile2.jpg',
    },
    {
      user_id: 3,
      useremail: 'user3@example.com',
      username: 'User 3',
      description: 'Description for User 3',
      profileImage: 'profile3.jpg',
    },
    {
      user_id: 4,
      useremail: 'user4@example.com',
      username: 'User 4',
      description: 'Description for User 4',
      profileImage: 'profile4.jpg',
    },
    {
      user_id: 5,
      useremail: 'user5@example.com',
      username: 'User 5',
      description: 'Description for User 5',
      profileImage: 'profile5.jpg',
    },
    {
      user_id: 6,
      useremail: 'user6@example.com',
      username: 'User 6',
      description: 'Description for User 6',
      profileImage: 'profile6.jpg',
    },
    {
      user_id: 7,
      useremail: 'user7@example.com',
      username: 'User 7',
      description: 'Description for User 7',
      profileImage: 'profile7.jpg',
    },
    {
      user_id: 8,
      useremail: 'user8@example.com',
      username: 'User 8',
      description: 'Description for User 8',
      profileImage: 'profile8.jpg',
    },
  ];

  const { data: userData, isLoading } = useGetUsersData();

  return (
    <div className={styles.block}>
      <h2>유저 모아보기</h2>
      <div className={styles.nav}>
        <input type="checkbox" />
        <div>내 친구만 보기</div>
      </div>
      <div className={styles.listBlock}>
        {isLoading ? (
          <div>로딩중</div>
        ) : (
          fakeData?.map((item) => <UserItem data={item} key={item.user_id} />)
        )}
      </div>
      <div>페이지네이션자리</div>
    </div>
  );
};

export default UserList;

const UserItem = ({ data }: { data: UserItemType }) => {
  const navigator = useNavigate();

  const { user_id, profileImage, username, description } = data;

  return (
    <div
      className={styles.item}
      onClick={() => {
        navigator(`/user/${user_id}`);
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
    </div>
  );
};
