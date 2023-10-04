import React from 'react';

import styles from './index.module.scss';
import { handleImgError } from '../../utils/handleImg';

const MyCard = () => {
  return (
    <section className={styles.myCard}>
      <img src="" alt="의 프로필사진" onError={handleImgError} />
      <div>
        <h2>유저 이름</h2>
        <h3>반가워</h3>
        <h3>유저 소개</h3>
      </div>
    </section>
  );
};

export default MyCard;
