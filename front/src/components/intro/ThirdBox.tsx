import React from 'react';
import styles from './index.module.scss';

const ThirdBox: React.FC = () => {
  return (
    <section className={styles.block}>
      <div>
        <div>분석 결과를 통해 다양한 이모지를 확인하세요.</div>
        <div>우리의 AI가 감정을 빠르고 정확하게 분석합니다.</div>
      </div>
      <div className={styles.thirdBoxImg}>
        <img src="/mac.png" alt="mac.png" />
      </div>
    </section>
  );
};

export default ThirdBox;
