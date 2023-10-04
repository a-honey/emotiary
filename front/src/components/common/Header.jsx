import { Link } from 'react-router-dom';
import styles from './layout.module.scss';
import { handleImgError } from '../../utils/handleImg';

const Header = () => {
  const isLogin = false;

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>EMOTIARY</div>
      <nav className={styles.navContainer}>
        <Link to="/">MY CALENDAR</Link>
        <Link to="/network">LATEST DIARY</Link>
        <Link to="/users">ALL USERS</Link>
        <Link to="/analysis">ANALYSIS</Link>
      </nav>
      {isLogin ? (
        <div className={styles.userInfo}>
          <img src="" alt="의 프로필사진" onError={handleImgError} />
          <div>유저이름</div>
        </div>
      ) : (
        <div>
          <Link to="/login">LOGIN</Link>
          <Link to="/register">REGISTER</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
