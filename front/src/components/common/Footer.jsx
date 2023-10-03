import { useLocation } from 'react-router-dom';
import styles from './layout.module.scss';

const Footer = () => {
  const location = useLocation(); // 현재 경로를 가져옴
  const currentPath = location.pathname; // 현재 경로의 pathname을 가져옴

  // 배열 안에 현재 pathname이 존재하면 footer를 반환, 없으면 반환하지 않음
  if (['/intro', '/login', '/register'].includes(currentPath)) {
    return (
      <footer className={styles.footer}>
        <div className={styles.textContainer}>
          <p>저작권</p>
          <p>개인정보처리방침</p>
        </div>
      </footer>
    );
  } else {
    return;
  }
};
export default Footer;
