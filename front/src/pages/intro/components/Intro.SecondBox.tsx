import React, { useEffect, useRef, useState } from 'react';
import useIsScrollAnimation from '../../../hooks/useIsScrollAnimation';
import writing from '../assets/writing.jpeg.png';
import styles from './index.module.scss';

const SecondBox = () => {
  const { isAnimated, boxRef } = useIsScrollAnimation();

  return (
    <section className={`${styles.white} ${styles.second}`} ref={boxRef}>
      <div
        className={
          isAnimated
            ? `${styles.animation} ${styles.textBlock}`
            : styles.textBlock
        }
      >
        <div className={styles.text}>감정을 자유롭게 표현해보세요.</div>
        <div className={styles.text}>
          감정적인 순간을 공유하면, 자동으로 분석해드립니다.
        </div>
      </div>
      <img src={writing} width={600} alt="게시글 이미지" />
    </section>
  );
};

export default SecondBox;
