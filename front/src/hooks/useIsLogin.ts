import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userIdSelector } from '../states/selectors/userSelector';

// 컴포넌트에서 / navigate까지 해줄지 나중에 생각
const useIsLogin = () => {
  const location = useLocation();
  // 현재 경로를 가져옴
  const currentPath = location.pathname;
  // userState에서 name을 가져옴
  const userName = useRecoilValue(userIdSelector);
  // localStorage에서 token을 가져옴
  const token = localStorage.getItem('userToken');

  return !token || userName === '';
};
