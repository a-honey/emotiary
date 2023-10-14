import React, { useEffect, useRef, useState } from 'react';
import useIsScrollAnimation from '../../../hooks/useIsScrollAnimation';

import styles from './index.module.scss';

const SecondBox = () => {
  const { isAnimated, boxRef } = useIsScrollAnimation();

  return (
    <section className={styles.white} ref={boxRef}>
      <div className={isAnimated ? styles.animation : ''}>
        <div>여기에서 감정을 자유롭게 표현해보세요.</div>
        <div>감정적인 순간을 공유하고, 우리가 분석해드립니다.</div>
      </div>
      <div>이미지</div>
    </section>
  );
};

export default SecondBox;
