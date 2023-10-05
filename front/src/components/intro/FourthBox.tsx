import React, { useEffect, useRef, useState } from 'react';
import useIsScrollAnimation from '../../hooks/useIsScrollAnimation';

import styles from './index.module.scss';

const FourthBox = () => {
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
