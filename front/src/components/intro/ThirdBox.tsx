import React, { useEffect, useRef, useState } from 'react';
import useIsScrollAnimation from '../../hooks/useIsScrollAnimation';

import styles from './index.module.scss';

const ThirdBox: React.FC = () => {
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

  console.log('2top:', boxPosition.top);
  console.log('2left:', boxPosition.left);
  const isAnimated = useIsScrollAnimation(boxPosition.top);

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
