import React, { ReactNode } from 'react';

import Footer from './components/Layout.Footer';
import Header from './components/Layout.Header';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userNameSelector } from '../../states/selectors/userSelector';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigator = useNavigate();
  const location = useLocation();
  // 현재 경로를 가져옴
  const currentPath = location.pathname;
  // userState에서 name을 가져옴
  const userName = useRecoilValue(userNameSelector);
  // localStorage에서 token을 가져옴
  const token = localStorage.getItem('userToken');

  /// 인트로, 로그인, 회원가입 페이지가 아닐경우 로그인 상태를 확인하여 navigate
  if (!['/intro', '/login', '/register'].includes(currentPath)) {
    if (!token || userName === '') {
      //navigator('/intro');
      //return;
    }
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
