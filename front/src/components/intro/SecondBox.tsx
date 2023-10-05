import React, { useEffect, useRef, useState } from 'react';
import useIsScrollAnimation from '../../hooks/useIsScrollAnimation';

import styles from './index.module.scss';

const SecondBox = () => {
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

  const isAnimated = useIsScrollAnimation(boxPosition.top);

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
