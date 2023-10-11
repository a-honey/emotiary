import { useState, useEffect, useRef } from 'react';

// ref 객체를 반환하여 컴포넌트 위치를 가져와 해당 위치에 스크롤이 도달하면 true를 반환
function useIsScrollAnimation() {
  const [isAnimated, setIsAnimated] = useState(false);

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

  useEffect(() => {
    // 500ms 간격으로 현재 스크롤 위치 확인
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // 컴포넌트 상단 위치가 스크롤보다 크거나 같으면 true를 반환
        setIsAnimated(scrollY >= boxPosition.top);
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [boxPosition]);

  return { isAnimated, boxRef };
}

export default useIsScrollAnimation;
