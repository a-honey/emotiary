import React, { useState } from 'react';
import styles from './index.module.scss';
import { handleImgError } from '../../utils/handleImg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DairyItemType } from '../../types/diaryType';
import DiaryItemShow from '../common/modal/DiaryItemShow';

const DiaryList = () => {
  const mockDatas = [
    {
      diary_id: 2,
      user_id: 2,
      username: '가짜데이터',
      profileImage: '',
      title: '일기제목',
      dateCreated: new Date(),
      content:
        '고양이가 밥을 안준다고 나를 깨웠다. 고양이가 밥을 안준다고 나를 깨웠다. 고양이가 밥을 안준다고 나를 깨웠다. 고양이가 밥을 안준다고 나를 깨웠다. 고양이가 밥을 안준다고 나를 깨웠다. 고양이가 밥을 안준다고 나를 깨웠다. 고양이가 밥을 안준다고 나를 깨웠다. 고양이가 밥을 안준다고 나를 깨웠다. 고양이가 밥을 안준다고 나를 깨웠다.',
      emoji: '😆',
    },
    {
      diary_id: 2,
      user_id: 2,
      username: '가짜데이터',
      profileImage: '',
      title: '일기제목',
      dateCreated: new Date(),
      content: '고양이가 밥을 안준다고 나를 깨웠다.',
      emoji: '😆',
    },
    {
      diary_id: 2,
      user_id: 2,
      username: '가짜데이터',
      profileImage: '',
      title: '일기제목',
      dateCreated: new Date(),
      content: '고양이가 밥을 안준다고 나를 깨웠다.',
      emoji: '😆',
    },
    {
      diary_id: 2,
      user_id: 2,
      username: '가짜데이터',
      profileImage: '',
      title: '일기제목',
      dateCreated: new Date(),
      content: '고양이가 밥을 안준다고 나를 깨웠다.',
      emoji: '😆',
    },
    {
      diary_id: 2,
      user_id: 2,
      username: '가짜데이터',
      profileImage: '',
      title: '일기제목',
      dateCreated: new Date(),
      content: '고양이가 밥을 안준다고 나를 깨웠다.',
      emoji: '😆',
    },
    {
      diary_id: 2,
      user_id: 2,
      username: '가짜데이터',
      profileImage: '',
      title: '일기제목',
      dateCreated: new Date(),
      content: '고양이가 밥을 안준다고 나를 깨웠다.',
      emoji: '😆',
    },
    {
      diary_id: 2,
      user_id: 2,
      username: '가짜데이터',
      profileImage: '',
      title: '일기제목',
      dateCreated: new Date(),
      content: '고양이가 밥을 안준다고 나를 깨웠다.',
      emoji: '😆',
    },
    {
      diary_id: 2,
      user_id: 2,
      username: '가짜데이터',
      profileImage: '',
      title: '일기제목',
      dateCreated: new Date(),
      content: '고양이가 밥을 안준다고 나를 깨웠다.',
      emoji: '😆',
    },
  ];

  return (
    <div className={styles.diaryBlock}>
      <h2>다른 유저의 일기 모아보기</h2>
      <div className={styles.nav}>
        <input type="checkbox" />
        <div>친구 일기만 보기</div>
      </div>
      <div className={styles.diaryListBlock}>
        {mockDatas?.map((item) => (
          <DairyItem data={item} key={item.diary_id} />
        ))}
      </div>
      <div>페이지네이션자리</div>
    </div>
  );
};

export default DiaryList;

const DairyItem = ({ data }: { data: DairyItemType }) => {
  const navigator = useNavigate();
  const [isOpenDiary, setIsOpenDiary] = useState(false);

  const handleIsOpenModal = () => {
    setIsOpenDiary(false);
  };

  return (
    <>
      {isOpenDiary && <DiaryItemShow handleIsOpenModal={handleIsOpenModal} />}
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
