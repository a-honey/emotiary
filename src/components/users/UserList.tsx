import React from 'react';
import styles from './index.module.scss';
import { handleImgError } from '../../utils/handleImg';
import { useNavigate } from 'react-router-dom';
import { UserItemType } from '../../types/userType';

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

  return (
    <div className={styles.block}>
      <h2>유저 모아보기</h2>
      <div className={styles.nav}>
        <input type="checkbox" />
        <div>내 친구만 보기</div>
      </div>
      <div className={styles.listBlock}>
        {fakeData && fakeData.map((item) => <UserItem data={item} />)}
      </div>
      <div>페이지네이션자리</div>
    </div>
  );
};

export default UserList;

const UserItem = ({ data }: { data: UserItemType }) => {
  const navigator = useNavigate();

  return (
    <div
      className={styles.item}
      onClick={() => {
        navigator(`/user/${data.user_id}`);
      }}
    >
      <div>
        <img
          src={data.profileImage}
          alt={`${data.username}의 프로필사진`}
          onError={handleImgError}
        />
        <div className={styles.emoji}>😆</div>
      </div>
      <div className={styles.content}>
        <div>{data.username}</div>
        <div>{data.description}</div>
      </div>
    </div>
  );
};
