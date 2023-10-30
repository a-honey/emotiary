import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './index.module.scss';
import { handleImgError } from '../../../utils/imgHandlers';
import { useNavigate } from 'react-router-dom';
import DiaryItemShow from '../../../components/diary/DiaryItemShow';
import { useGetDiarysData } from '../../../api/get/useGetDiaryData';
import { instance } from '../../../api/instance';
import { GoHeartFill, GoHeart } from 'react-icons/go';
import Pagination from '../../../components/Pagination';
import Tab, { TapType } from './Network.Tab';

interface DairyItemType {
  id: string;
  authorId: string;
  title: string;
  createdDate: Date;
  content: string;
  emoji: string;
  favoriteCount: number;
  author: {
    id: string;
    username: string;
    email: string;
    profileImage: string;
  };
}

const DiaryList = () => {
  const [select, setSelect] = useState('all');
  const [tapEmotion, setTapEmotion] = useState<TapType['resource']>('all');

  const [currentPage, setCurrentPage] = useState(1);

  const userId = localStorage.getItem('userId');
  const navigator = useNavigate();
  const { data, isFetching, refetch } = useGetDiarysData({
    emotion: tapEmotion,
    select,
    page: currentPage,
    limit: 8,
  });

  const handleTapEmotion = (tapName: TapType['resource']) => {
    setTapEmotion(tapName);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Update the 'select' state based on the checkbox value.
    const newSelect = e.target.checked ? 'friends' : 'all';
    setSelect(newSelect);
  };

  return (
    <div className={styles.diaryBlock}>
      <div className={styles.nav}>
        <h2>다른 유저의 일기 모아보기</h2>
        <div>
          <input type="checkbox" onChange={handleCheckboxChange} />
          <div>친구 일기만 보기</div>
        </div>
      </div>
      <Tab tapEmotion={tapEmotion} handleTapEmotion={handleTapEmotion} />
      <div className={styles.diaryListBlock}>
        {isFetching ? (
          <div>로딩중</div>
        ) : data?.length === 0 ? (
          <div>데이터가 없습니다.</div>
        ) : (
          data?.data?.map((item: DairyItemType) => (
            <DairyItem data={item} key={item.id} />
          ))
        )}
      </div>

      <Pagination
        totalPage={data?.pageInfo?.totalPage}
        currentPage={currentPage}
        handlePage={setCurrentPage}
      />
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

  const handleDiaryLikeClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    try {
      await instance.post(`/favorites/${data.id}`);
      data.favoriteCount += 1;
    } catch {
      console.error('좋아요 누르기 실패');
    }
  };

  return (
    <>
      {isOpenDiary && (
        <DiaryItemShow toggleIsOpenModal={toggleIsOpenModal} id={data.id} />
      )}
      <div
        className={styles.dairyItem}
        onClick={() => {
          setIsOpenDiary(true);
        }}
      >
        <div className={styles.emoji}>{data.emoji}</div>
        <div className={styles.content}>
          <h3>{data.title}</h3>
          <div onClick={handleDiaryLikeClick} className={styles.like}>
            {data.favoriteCount === 0 ? <GoHeart /> : <GoHeartFill />}
            <div>{data.favoriteCount}</div>
          </div>
        </div>
        <div
          className={styles.userInfo}
          onClick={(e) => {
            e.stopPropagation();
            navigator(`/user/${data.authorId}`);
          }}
        >
          <img
            src={data.author.profileImage ?? '/user_none.png'}
            alt={`${data.author.username}의 프로필사진`}
            onError={handleImgError}
          />
          <div>{data.author.username}</div>
        </div>
      </div>
    </>
  );
};
