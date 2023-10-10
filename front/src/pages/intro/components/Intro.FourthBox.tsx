import React, { useEffect, useRef, useState } from 'react';
import useIsScrollAnimation from '../../../hooks/useIsScrollAnimation';

import styles from './index.module.scss';

const FourthBox = () => {
  const { isAnimated, boxRef } = useIsScrollAnimation();

  return (
    <section className={styles.white} ref={boxRef}>
      <div className={isAnimated ? styles.animation : ''}>
        <div>자동으로 생성된 이모지를 공유하고 느낌을 표현하세요</div>
      </div>
      <div>
        <div>이모지1</div>
        <div>이모지2</div>
        <div>이모지3</div>
      </div>
    </section>
  );
};

export default FourthBox;
