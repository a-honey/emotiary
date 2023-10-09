import React from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import { handleImgError } from '../../utils/imgHandlers';

const Header = () => {
  const isLogin = false;
  const navigator = useNavigate();

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
          <Link to="/analysis">ANALYSIS</Link>
        </nav>
        {isLogin ? (
          <div
            className={styles.userInfo}
            onClick={() => {
              navigator('/mypage');
            }}
          >
            <img src="" alt="의 프로필사진" onError={handleImgError} />
            <div>유저이름</div>
            <div>친구요청알림</div>
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
