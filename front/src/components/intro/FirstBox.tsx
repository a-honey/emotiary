import React from 'react';

import useIsScrollAnimation from '../../hooks/useIsScrollAnimation';
import styles from './index.module.scss';

const FirstBox = () => {
  const isAnimated = useIsScrollAnimation(0);

  console.log(isAnimated ? '얍' : '노');
  return (
    <section className={styles.block}>
      <div>프로젝트 설명</div>
      <div className={isAnimated ? styles.animation : ''}>
        <div>이모지1</div>
        <div>이모지2</div>
        <div>이모지3</div>
      </div>
    </section>
  );
};

export default FirstBox;
