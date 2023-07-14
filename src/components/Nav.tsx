import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../store/UserContext';
import styles from './Nav.module.css';

export default function Nav() {
  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedIsLoginSuccess = localStorage.getItem('isLoginSuccess');
    if (savedUser && savedIsLoginSuccess) {
      updateUser(JSON.parse(savedUser));
    }
  }, [updateUser]);

  const handleLogout = () => {
    // 로그아웃 시 로컬 스토리지에서 로그인 정보 제거
    localStorage.removeItem('user');
    localStorage.removeItem('isLoginSuccess');
    updateUser(null);
  };

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
        {!user && (
          <>
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
          </>
        )}
        {user && (
          <div>
            <span className="me-5 fw-bold">
              <span className="text-success fw-bold">우리 같이 캠핑가요,</span>{' '}
              {user.displayName}님{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-suit-heart-fill text-danger"
                viewBox="0 0 16 16"
              >
                <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z" />
              </svg>
            </span>
            <button
              type="button"
              className="btn btn-outline-primary me-4"
              onClick={handleLogout}
            >
              로그아웃
            </button>
            <button type="button" className="btn btn-outline-secondary me-4">
              <Link to="/signup" className={styles.customLink}>
                회원가입
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
