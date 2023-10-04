import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userNameSelector } from '../components/state/selectors/userSelector';

// 로그인 상태가 아닐 경우 intro 페이지 이동, 로그인 상태일 경우 true를 반환하는 hook
const useIsLogin = () => {
  const navigator = useNavigate();
  // userState에서 name을 가져옴
  const userName = useRecoilValue(userNameSelector);
  // localStorage에서 token을 가져옴
  const token = localStorage.getItem('userToken');

  useEffect(() => {
    if (!token || userName === '') {
      // token이 없거나, userName이 없는 경우(비 로그인상태) /intro로 이동
      navigator('/intro'); // 로그인 상태가 아님을 반환
      return false;
    }
  }, [navigator, token, userName]);

  return true; // 로그인 상태임을 반환
};

export default useIsLogin;
