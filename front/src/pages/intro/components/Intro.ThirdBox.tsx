import React, { useEffect, useRef, useState } from 'react';
import useIsScrollAnimation from '../../../hooks/useIsScrollAnimation';

import styles from './index.module.scss';

const ThirdBox: React.FC = () => {
  const { isAnimated, boxRef } = useIsScrollAnimation();

  return (
    <section className={styles.block} ref={boxRef}>
      <div className={isAnimated ? styles.animation : ''}>
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
