import React, { useEffect, useState, useRef } from 'react';

import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import FriendReqList from './Layout.FriendReqList';
import { GrLogout, GrNotification } from 'react-icons/gr';
import ImageComponent from '../ImageComponent';
import Toast from './Layout.Toast';
import { useRecoilValue } from 'recoil';
import { toastState } from '../../atoms/toastState';
import logo from '../../assets/logo.gif';
import { logout } from '../../utils/localStorageHandlers';
import { io, Socket } from 'socket.io-client';
import ChatButton from '../chat/Chat.ChatButton';

const locations = [
  { name: 'MY CALENDAR', to: '/main' },
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
    logout();

    // 로그아웃 후 / 경로로 이동
    navigator('/');
  };

  useEffect(() => {
    setIsOpenFriendReqList(false);
  }, [location.pathname]);

  useEffect(() => {}, [userImg, token]);


  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (token) {
      socketRef.current = io('ws://localhost:5001', {
        path: '/chat',
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
       
      });

      socketRef.current.on('connect', () => {
        console.log('소켓이 연결되었습니다.');
      });

      socketRef.current.on('connect_error', (error) => {
        console.log('소켓 연결 에러:', error);
      });

      socketRef.current.on('error', (error) => {
        console.log('소켓 에러:', error);
      });

      socketRef.current.on('disconnect', (reason) => {
        console.log('소켓이 연결이 끊어졌습니다. 사유:', reason);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [token]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link className={styles.logoContainer} key="logo" to="/">
            <img src={logo} alt="로고" />
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
      {token && <ChatButton socket={socketRef.current!} />}
    </>
  );
};

export default Header;
