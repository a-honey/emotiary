import React from 'react';
import useIsScrollAnimation from '../../../hooks/useIsScrollAnimation';
import network from '../../../assets/network.jpeg';
import styles from './index.module.scss';

const FourthBox = () => {
  const { isAnimated, boxRef } = useIsScrollAnimation();

  return (
    <section className={`${styles.white} ${styles.fourth}`} ref={boxRef}>
      <div className={isAnimated ? styles.animation : ''}>
        <div
          className={
            isAnimated ? `${styles.animation} ${styles.text}` : styles.text
          }
        >
          자동으로 생성된 이모지를 공유하고 느낌을 표현하세요
        </div>
      </div>
      <img src={network} alt="네트워크 페이지" />
    </section>
  );
};

export default FourthBox;
