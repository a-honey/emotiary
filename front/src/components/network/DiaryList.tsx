import React from 'react';
import styles from './index.module.scss';
import { handleImgError } from '../../utils/handleImg';

const DiaryList = () => {
  return (
    <div className={styles.diaryBlock}>
      <h2>다른 유저의 일기 모아보기</h2>
      <div className={styles.nav}>
        <input type="checkbox" />
        <div>친구 일기만 보기</div>
      </div>
      <div className={styles.diaryListBlock}>
        <DairyItem />
        <DairyItem />
      </div>
    </div>
  );
};

export default DiaryList;

const DairyItem = () => {
  return (
    <div className={styles.dairyItem}>
      <div className={styles.emoji}>😆</div>
      <p>
        일기 내용일기 내용일기 내용일기 내용일기 내용일기 내용일기 내용일기
        내용일기 내용일기 내용일기 내용일기 내용일기 내용일기 내용일기 내용일기
      </p>
      <div className={styles.userInfo}>
        <img src="" alt="의 프로필사진" onError={handleImgError} />
        <div>작성자명</div>
      </div>
    </div>
  );
};
