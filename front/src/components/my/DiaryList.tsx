import React from 'react';

import styles from './index.module.scss';

const DiaryList = () => {
  return (
    <section className={styles.diaryList}>
      <h2>일기 모아보기</h2>
      <div className={styles.listBlock}>
        <DiaryItem />
        <DiaryItem />
      </div>
    </section>
  );
};

export default DiaryList;

const DiaryItem = () => {
  return (
    <div className={styles.diaryItem}>
      <div>일기제목</div>
      <div>일기날짜</div>
    </div>
  );
};
