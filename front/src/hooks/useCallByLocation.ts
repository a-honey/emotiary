import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// 업데이트 함수를 인자로 주니까 무한 렌더링됨. 왜지?
const useCallByLocation = (fn: () => void) => {
  const location = useLocation();

  useEffect(() => {
    fn();
  }, [location.pathname, fn]);
  return;
};

export default useCallByLocation;
