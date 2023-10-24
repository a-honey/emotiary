import React, { useEffect, useState } from 'react';

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import FriendReqList from './Layout.FriendReqList';
import { GrLogout, GrNotification } from 'react-icons/gr';
import ImageComponent from '../ImageComponent';
import Toast from './Layout.Toast';
import { useRecoilValue } from 'recoil';
import { toastState } from '../../atoms/toastState';

const locations = [
  { name: 'MY CALENDAR', to: '/' },
  { name: 'LATEST DIARY', to: '/network' },
  { name: 'ALL USERS', to: '/users' },
];

const Header = () => {
  // 로컬 스토리지에서 토큰을 가져와서 로그인 상태 확인
  const token = localStorage.getItem('token');
  const userImg = localStorage.getItem('userImg');

  const isLogin = token !== null;

  const messages = useRecoilValue(toastState);

  const navigator = useNavigate();
  const location = useLocation();

  const [isOpenFriendReqList, setIsOpenFriendReqList] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');

    // 로그아웃 후 /intro 경로로 이동
    navigator('/intro');
  };

  useEffect(() => {
    setIsOpenFriendReqList(false);
  }, [location.pathname]);

  useEffect(() => {}, [userImg]);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link className={styles.logoContainer} key="logo" to="/intro">
            EMOTIARY
          </Link>
        </div>
        <nav className={styles.navContainer}>
          {locations.map((item) => (
            <Link
              key={item.to}
              className={location.pathname === item.to ? styles.active : ''}
              to={item.to}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        {isLogin ? (
          <div className={styles.right}>
            <div
              className={styles.userInfo}
              onClick={() => {
                navigator('/mypage');
              }}
            >
              <ImageComponent
                src={localStorage.getItem('userImg')}
                alt={`${localStorage.getItem('username')}의 프로필사진`}
              />
              <div>{localStorage.getItem('username')}</div>
            </div>
            <GrNotification
              onClick={() => {
                setIsOpenFriendReqList((prev) => !prev);
              }}
            />
            {isOpenFriendReqList && <FriendReqList />}
            <GrLogout onClick={handleLogout} />
          </div>
        ) : (
          <div>
            <Link to="/signin">LOGIN</Link>
            <Link to="/signup">REGISTER</Link>
          </div>
        )}
      </header>
      {messages.length !== 0 && <Toast />}
      <Outlet />
    </>
  );
};

export default Header;
