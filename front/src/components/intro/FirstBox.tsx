import React, { useEffect, useRef, useState } from 'react';

import useIsScrollAnimation from '../../hooks/useIsScrollAnimation';
import styles from './index.module.scss';

const FirstBox = () => {
  const boxRef = useRef<HTMLElement | null>(null);
  // 화면의 컴포넌트 위치 정보를 저장
  const [boxPosition, setBoxPosition] = useState<{ top: number; left: number }>(
    { top: 0, left: 0 },
  );

  useEffect(() => {
    // 위치 정보를 업데이트하는 함수
    const updateBoxPosition = () => {
      const boxElement = boxRef.current as HTMLElement; // ref로 얻은 컴포넌트
      if (boxElement) {
        const rect = boxElement.getBoundingClientRect(); // 요소의 화면상 위치 정보를 얻음
        setBoxPosition({ top: rect.top, left: rect.left }); // 처음 렌더링되었을 때 한번만 위치 정보를 저장
      }
    };

    updateBoxPosition();
  }, []);

  const isAnimated = useIsScrollAnimation(boxPosition.top / 4);

  return (
    <section className={styles.block} ref={boxRef}>
      <div>
        <div>환영합니다! 감정 분석 일기 작성 서비스로 여러분을 초대합니다.</div>
        <div>감정을 기록하고, 우리의 AI가 감정 이모지로 해석해드립니다.</div>
      </div>
      <div
        className={
          isAnimated ? `${styles.animation} ${styles.emojis}` : styles.emojis
        }
      >
        <div className={styles.emoji}>😆</div>
        <div className={styles.emoji}>😮</div>
        <div className={styles.emoji}>😠</div>
      </div>
    </section>
  );
};

export default FirstBox;
