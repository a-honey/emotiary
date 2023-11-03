import React from 'react';
import useIsScrollAnimation from '../../../hooks/useIsScrollAnimation';
import mac from '../../../assets/mac.png';
import styles from './index.module.scss';

const ThirdBox: React.FC = () => {
  const { isAnimated, boxRef } = useIsScrollAnimation();

  return (
    <section className={styles.block} ref={boxRef}>
      <div className={styles.thirdBoxImg}>
        <img src={mac} alt="mac.png" />
      </div>
      <div
        className={
          isAnimated
            ? `${styles.animation} ${styles.textBlock}`
            : styles.textBlock
        }
      >
        <div className={styles.text}>
          분석 결과를 통해 다양한 이모지를 확인하세요.
        </div>
        <div className={styles.text}>
          우리의 AI가 감정을 빠르고 정확하게 분석합니다.
        </div>
      </div>
    </section>
  );
};

export default ThirdBox;
