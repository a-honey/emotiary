import { Link } from 'react-router-dom';
import styles from './layout.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>EMOTIARY</div>
      <nav className={styles.navContainer}>
        <Link to="/">MY CALENDAR</Link>
        <Link to="/network">LATEST DIARY</Link>
        <Link to="/users">ALL USERS</Link>
        <Link to="/analysis">ANALYSIS</Link>
      </nav>
      <div>
        <Link to="/login">LOGIN</Link>
        <Link to="/register">REGISTER</Link>
      </div>
    </header>
  );
};

export default Header;
