import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { handleImgError } from '../../../utils/imgHandlers';
import { useNavigate } from 'react-router-dom';
import DiaryItemShow from '../../../components/modal/DiaryItemShow';
import { useGetDiarysData } from '../../../api/get/useGetDiaryData';

interface DairyItemType {
  diary_id: string;
  user_id: string;
  username: string;
  profileImage: string;
  title: string;
  dateCreated: Date;
  content: string;
  emoji: string;
}

const DiaryList = () => {
  const [select, setSelect] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const userId = localStorage.getItem('userId');
  const navigator = useNavigate();
  const { data, isFetching } = useGetDiarysData(
    `${userId}`,
    select,
    currentPage,
    8,
  );

  /*
  useEffect(() => {
    if (!userId) {
      navigator('/intro');
    }
  }, [userId, navigator]);
  */
  return (
    <div className={styles.diaryBlock}>
      <h2>다른 유저의 일기 모아보기</h2>
      <div className={styles.nav}>
        <input type="checkbox" />
        <div>친구 일기만 보기</div>
      </div>
      <div className={styles.diaryListBlock}>
        {isFetching ? (
          <div>로딩중</div>
        ) : (
          data?.data?.map((item: DairyItemType) => (
            <DairyItem data={item} key={item.diary_id} />
          ))
        )}
      </div>
      <div>페이지네이션자리</div>
    </div>
  );
};

export default DiaryList;

const DairyItem = ({ data }: { data: DairyItemType }) => {
  const navigator = useNavigate();
  const [isOpenDiary, setIsOpenDiary] = useState(false);

  const toggleIsOpenModal = () => {
    setIsOpenDiary((prev) => !prev);
  };

  return (
    <>
      {isOpenDiary && (
        <DiaryItemShow
          toggleIsOpenModal={toggleIsOpenModal}
          id={data.diary_id}
        />
      )}
      <div
        className={styles.dairyItem}
        onClick={() => {
          setIsOpenDiary(true);
        }}
      >
        <div className={styles.emoji}>{data.emoji}</div>
        <div>
          <h3>{data.title}</h3>
          <p>{data.content}</p>
        </div>
        <div
          className={styles.userInfo}
          onClick={(e) => {
            e.stopPropagation();
            navigator(`/user/${data.user_id}`);
          }}
        >
          <img
            src={data.profileImage}
            alt={`${data.username}의 프로필사진`}
            onError={handleImgError}
          />
          <div>{data.username}</div>
        </div>
      </div>
    </>
  );
};
