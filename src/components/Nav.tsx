import { Link } from 'react-router-dom';
import styles from './Nav.module.css';

export default function Nav() {
  return (
    <div className={styles.navContainer}>
      <div className={styles.logoContainer}>
        <Link to="/" className={styles.customLink}>
          <img className={styles.logo} src="/campingLogo.png" alt="캠핑가자1" />
        </Link>
        <Link to="/" className={styles.customLink}>
          <h1 className="ms-4 mt-2">캠핑쥬아</h1>
        </Link>
      </div>
      <div className={styles.loginContainer}>
        <button type="button" className="btn btn-outline-primary me-4">
          <Link to="/login" className={styles.customLink}>
            로그인
          </Link>
        </button>

        <button type="button" className="btn btn-outline-secondary me-4">
          <Link to="/signup" className={styles.customLink}>
            회원가입
          </Link>
        </button>
      </div>
    </div>
  );
}
