import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './index.module.scss';

const Footer = () => {
  return (
    <>
      <Outlet />
      <footer className={styles.footer}>
        <div className={styles.textContainer}>
          <p>저작권</p>
          <p>개인정보처리방침</p>
        </div>
      </footer>
    </>
  );
};
export default Footer;
