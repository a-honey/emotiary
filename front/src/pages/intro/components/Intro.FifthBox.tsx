import React, { useEffect, useRef, useState } from 'react';
import useIsScrollAnimation from '../../../hooks/useIsScrollAnimation';

import { Link } from 'react-router-dom';
import styles from './index.module.scss';
import getUserId from '../../../utils/localStorageHandlers';

const FifthBox = () => {
  const { isAnimated, boxRef } = useIsScrollAnimation();
  const userId = getUserId;

  return (
    <section className={`${styles.block} ${styles.fifth}`} ref={boxRef}>
      <div className={styles.wrapper}>
        <div
          className={
            isAnimated ? `${styles.animation} ${styles.emoji}` : styles.emoji
          }
        >
          🥰
        </div>
        <div className={styles.text}>
          지금 시작해보세요! 간단한 일기 작성으로 감정을 표현해보세요
        </div>
        <div
          className={
            isAnimated ? `${styles.animation} ${styles.emoji}` : styles.emoji
          }
        >
          🥰
        </div>
      </div>
      {!userId && (
        <div className={styles.btns}>
          <Link to="/signin" className="doneBtn">
            로그인하러가기
          </Link>
          <Link to="/signup" className="doneBtn">
            회원가입하러가기
          </Link>
        </div>
      )}
    </section>
  );
};

export default FifthBox;
