import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { useGetUsersData } from '../../../api/get/useGetUserData';
import ImageComponent from '../../../components/ImageComponent';
import Pagination from '../../../components/Pagination';
import { usePostFriendReqMutation } from '../../../api/post/usePostFriendData';
import { QueryClient } from '@tanstack/react-query';
import { UserItemType } from '../../../api/get/useGetUserData.types';

const UserList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useGetUsersData({ page: currentPage, limit: 8 });

  /** 페이지네이션의 현재 페이지 업데이트 함수 */
  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

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
      <Pagination
        totalPage={data?.pageInfo.totalPage}
        currentPage={currentPage}
        handlePage={handleCurrentPage}
      />
    </div>
  );
};

export default UserList;

const UserItem = ({ data }: { data: UserItemType }) => {
  const navigator = useNavigate();

  const { id, username, description, latestEmoji, isFriend, filesUpload } =
    data;

  const queryClient = new QueryClient();
  const postMutation = usePostFriendReqMutation(queryClient);

  const handleFriendReqBtnClick = async () => {
    postMutation.mutate({ id });
  };
  return (
    <div
      className={styles.item}
      onClick={() => {
        navigator(`/user/${id}`);
      }}
    >
      <div>
        <ImageComponent
          src={filesUpload[filesUpload.length - 1]?.url ?? null}
          alt={`${username}의 프로필사진`}
        />
        <div className={styles.emoji}>{latestEmoji}</div>
      </div>
      <div className={styles.content}>
        <div>
          <div className={styles.name}>{username}</div>
          {!isFriend && (
            <button
              className={`doneBtn ${styles.friendReqBtn}`}
              onClick={handleFriendReqBtnClick}
            >
              +
            </button>
          )}
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};
