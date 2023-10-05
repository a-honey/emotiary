import React, { useEffect, useRef, useState } from 'react';
import useIsScrollAnimation from '../../hooks/useIsScrollAnimation';

import { Link } from 'react-router-dom';
import styles from './index.module.scss';

const FifthBox = () => {
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
    <section className={styles.block} ref={boxRef}>
      <div>지금 시작해보세요! 간단한 일기 작성으로 감정을 표현해보세요</div>
      <div className={isAnimated ? styles.animation : ''}>
        <div>이모지1</div>
        <div>이모지2</div>
        <div>이모지3</div>
      </div>
      <Link to="/login" className="doneBtn">
        로그인
      </Link>
      <Link to="/register" className="doneBtn">
        회원가입
      </Link>
    </section>
  );
};

export default FifthBox;
