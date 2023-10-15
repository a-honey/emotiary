import React, { useState } from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { handleImgError } from '../../utils/imgHandlers';
import FriendReqList from './Layout.FriendReqList';

const Header = () => {
  // 로컬 스토리지에서 토큰을 가져와서 로그인 상태 확인
  const token = localStorage.getItem('token');
  const isLogin = token !== null;
  const navigator = useNavigate();

  const [isOpenFriendReqList, setIsOpenFriendReqList] = useState(false);

  const handlesetIsOpenFriendReqList = (arg: boolean) => {
    handlesetIsOpenFriendReqList(arg);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');

    // 로그아웃 후 /intro 경로로 이동
    navigator('/intro');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link className={styles.logoContainer} to="/intro">
            EMOTIARY
          </Link>
        </div>
        <nav className={styles.navContainer}>
          <Link to="/">MY CALENDAR</Link>
          <Link to="/network">LATEST DIARY</Link>
          <Link to="/users">ALL USERS</Link>
          {/* <Link to="/analysis">ANALYSIS</Link> */}
        </nav>
        {isLogin ? (
          <div>
            <div
              className={styles.userInfo}
              onClick={() => {
                navigator('/mypage');
              }}
            >
              <img
                src={localStorage.getItem('userImg') as string}
                alt={`${localStorage.getItem('username')}의 프로필사진`}
                onError={handleImgError}
              />
              <div>{localStorage.getItem('username')}</div>
            </div>
            <div
              onClick={() => {
                setIsOpenFriendReqList((prev) => !prev);
              }}
            >
              친구요청알림
            </div>
            {isOpenFriendReqList && <FriendReqList />}
            <div onClick={handleLogout}>로그아웃</div>
          </div>
        ) : (
          <div>
            <Link to="/signin">LOGIN</Link>
            <Link to="/signup">REGISTER</Link>
          </div>
        )}
      </header>
      <Outlet />
    </>
  );
};

export default Header;
