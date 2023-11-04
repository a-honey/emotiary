import React, { useState } from 'react';
import styles from './index.module.scss';
import { useNavigate } from 'react-router-dom';
import { useGetUsersData } from '../../../api/get/useGetUserData';
import ImageComponent from '../../../components/ImageComponent';
import Pagination from '../../../components/Pagination';
import { usePostFriendReqMutation } from '../../../api/post/usePostFriendData';
import { UserItemType } from '../../../api/get/useGetUserData.types';
import search from '../../../assets/search.png';
import SearchList from '../../../components/search/Search.SearchList';

const UserList = () => {
  const [select, setSelect] = useState<'all' | 'friends'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const [isOpenSearchList, setIsOpenSearchList] = useState(false);

  const toggleIsOpenList = () => {
    setIsOpenSearchList((prev) => !prev);
  };

  const { data, isFetching } = useGetUsersData({
    page: currentPage,
    limit: 8,
    select,
  });

  /** 페이지네이션의 현재 페이지 업데이트 함수 */
  const handleCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSelect = e.target.checked ? 'friends' : 'all';
    setSelect(newSelect);
    setCurrentPage(1);
  };

  return (
    <>
      {isOpenSearchList && (
        <SearchList
          toggleIsOpenSearchList={toggleIsOpenList}
          targetName="유저"
        />
      )}
      <div className={styles.block}>
        <div className={styles.head}>
          <h2>유저 모아보기</h2>
          <img onClick={toggleIsOpenList} src={search} alt="검색이미지" />
        </div>
        <div className={styles.nav}>
          <input type="checkbox" onChange={handleCheckboxChange} />
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
    </>
  );
};

export default UserList;

const UserItem = ({ data }: { data: UserItemType }) => {
  const navigator = useNavigate();

  const { id, username, description, latestEmoji, isFriend, profileImage } =
    data;

  const postMutation = usePostFriendReqMutation();

  const handleFriendReqBtnClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    const confirm = window.confirm(
      `${username}님에게 친구 요청을 보내겠습니까?`
    );
    if (confirm) {
      postMutation.mutate({ id });
    }
  };

  return (
    <div
      className={styles.item}
      onClick={() => {
        navigator(`/user/${id}`);
      }}
    >
      <div className={styles.btns}>
        {!isFriend && (
          <button
            className={`doneBtn ${styles.friendBtn}`}
            onClick={handleFriendReqBtnClick}
          >
            +
          </button>
        )}
      </div>
      <div>
        <ImageComponent
          src={
            profileImage && profileImage?.length !== 0
              ? profileImage[profileImage?.length - 1]?.url
              : null
          }
          alt={`${username}의 프로필사진`}
        />
        <div className={styles.emoji}>{latestEmoji}</div>
      </div>
      <div className={styles.content}>
        <div>
          <div className={styles.name}>{username}</div>
        </div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};
