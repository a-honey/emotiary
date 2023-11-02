import React, { useEffect, useRef, useState } from 'react';

import useIsScrollAnimation from '../../../hooks/useIsScrollAnimation';
import styles from './index.module.scss';

const FirstBox = () => {
  const { isAnimated, boxRef } = useIsScrollAnimation();

  return (
    <section className={`${styles.first} ${styles.block}`} ref={boxRef}>
      <div
        className={
          isAnimated ? `${styles.animation} ${styles.emojis}` : styles.emojis
        }
      >
        <div className={styles.emoji}>😆</div>
        <div className={styles.emoji}>😮</div>
        <div className={styles.emoji}>😠</div>
      </div>
      <div className={styles.textBlock}>
        <div className={styles.text}>
          환영합니다! 감정 분석 일기 작성 서비스 <span>Emotiary</span> 로
          여러분을 초대합니다.
        </div>
        <div className={styles.text}>
          감정을 기록하고, 우리의 AI가 감정 이모지로 해석해드립니다.
        </div>
      </div>
    </section>
  );
};

export default FirstBox;
