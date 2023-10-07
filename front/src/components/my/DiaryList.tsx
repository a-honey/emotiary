import React from 'react';

import styles from './index.module.scss';
import { MyDairyItemType } from '../../types/diaryType';

const DiaryList = () => {
  const fakeDairyData: MyDairyItemType[] = [
    {
      diary_id: 1,
      title: 'My First Diary',
      dateCreated: new Date('2023-10-01'),
      emoji: '📔',
    },
    {
      diary_id: 2,
      title: 'Fun Day Out',
      dateCreated: new Date('2023-09-25'),
      emoji: '😄',
    },
    {
      diary_id: 3,
      title: 'A Walk in the Park',
      dateCreated: new Date('2023-09-20'),
      emoji: '🌳',
    },
    {
      diary_id: 4,
      title: 'Memorable Trip',
      dateCreated: new Date('2023-09-15'),
      emoji: '✈️',
    },
    {
      diary_id: 5,
      title: 'Delicious Food Adventures',
      dateCreated: new Date('2023-09-10'),
      emoji: '🍔',
    },
    {
      diary_id: 6,
      title: 'Productive Workday',
      dateCreated: new Date('2023-09-05'),
      emoji: '💼',
    },
    {
      diary_id: 7,
      title: 'Family Time',
      dateCreated: new Date('2023-08-30'),
      emoji: '👨‍👩‍👧‍👦',
    },
    {
      diary_id: 8,
      title: 'Hobby Exploration',
      dateCreated: new Date('2023-08-25'),
      emoji: '🎨',
    },
    {
      diary_id: 9,
      title: 'Movie Night',
      dateCreated: new Date('2023-08-20'),
      emoji: '🍿',
    },
    {
      diary_id: 10,
      title: 'Fitness Journey',
      dateCreated: new Date('2023-08-15'),
      emoji: '🏋️‍♂️',
    },
    {
      diary_id: 11,
      title: 'Weekend Getaway',
      dateCreated: new Date('2023-08-10'),
      emoji: '🌄',
    },
    {
      diary_id: 12,
      title: 'Favorite Book',
      dateCreated: new Date('2023-08-05'),
      emoji: '📚',
    },
    {
      diary_id: 13,
      title: 'Cooking Experiment',
      dateCreated: new Date('2023-07-30'),
      emoji: '🍳',
    },
    {
      diary_id: 14,
      title: 'Music Concert',
      dateCreated: new Date('2023-07-25'),
      emoji: '🎵',
    },
    {
      diary_id: 15,
      title: 'Tech Conference',
      dateCreated: new Date('2023-07-20'),
      emoji: '💻',
    },
  ];

  return (
    <section className={styles.diaryList}>
      <h2>일기 모아보기</h2>
      <div className={styles.listBlock}>
        {fakeDairyData?.map((item) => (
          <DiaryItem data={item} key={item.diary_id} />
        ))}
      </div>
      <div>페이지네이션 자리</div>
    </section>
  );
};

export default DiaryList;

const DiaryItem = ({ data }: { data: MyDairyItemType }) => {
  return (
    <div className={styles.diaryItem}>
      <div>{data.title}</div>
      <div>2023-8-25</div>
    </div>
  );
};
