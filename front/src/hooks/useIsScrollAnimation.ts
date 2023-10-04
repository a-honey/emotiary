import { useState, useEffect } from 'react';

// 파라미터로 특정 위치를 받아 해당 위치에 스크롤이 도달하면 true를 반환
function useIsScrollAnimation(triggerPoint = 200) {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // 현재 스크롤 위치 확인
    const handleScroll = () => {
      const scrollY = window.scrollY;
      console.log('현재 위치', scrollY);

      // 스크롤 위치가 파라미터보다 크거나 같으면 애니메이션 활성화
      if (scrollY >= triggerPoint) {
        setIsAnimated(true);
      } else {
        // 스크롤 위치가 파라미터보다 작으면 애니메이션 비활성화
        setIsAnimated(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [triggerPoint]);

  return isAnimated;
}

export default useIsScrollAnimation;
