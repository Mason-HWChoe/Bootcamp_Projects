import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';

import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import UserContext from '../store/UserContext';
import styles from './LoginPage.module.css';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseUrl: process.env.REACT_APP_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useContext(UserContext);

  const auth = getAuth();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      updateUser(JSON.parse(savedUser));
    }
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(e.target.value);
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        console.log('로그인 성공');
        const user = userCredential.user;

        updateProfile(user, {
          displayName: user.displayName,
        })
          .then(() => {
            updateUser({
              displayName: user.displayName ? user.displayName : '',
            });
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
          })
          .catch((error) => {
            console.log('사용자 정보 업데이트 실패:', error);
          });
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          setLoginError('이메일 또는 비밀번호가 잘못되었습니다.');
        }
      });
  };

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        updateProfile(user, {
          displayName: user.displayName,
        })
          .then(() => {
            updateUser({
              displayName: user.displayName ? user.displayName : '',
            });
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
          })
          .catch((error) => {
            console.log('사용자 정보 업데이트 실패:', error);
          });
      })
      .catch((error) => {
        console.log('구글 로그인 실패:', error);
      });
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <h4 className="display-6 text-muted mb-3 fw-bold">로그인</h4>
        <form onSubmit={handleLogin}>
          <FormField
            type="email"
            id="floatingEmail"
            placeholder="email"
            label="Email"
            margin={4}
            onChange={handleEmailChange}
          />
          <FormField
            type="password"
            id="floatingPassword"
            placeholder="Password"
            label="Password"
            margin={4}
            onChange={handlePasswordChange}
          />
          {loginError && <div className="text-danger">{loginError}</div>}
          <button type="submit" className="btn btn-primary container mt-4 mb-2">
            <span className="fs-4 fw-semibold">로그인</span>
          </button>
        </form>
        <div className="text-end pe-2 text-decoration-underline">
          <Link to="/signUp" className={styles.customLink}>
            회원가입
          </Link>
        </div>

        <p className="text-center mt-4 text-black-50">OR</p>

        <button
          type="submit"
          className="btn btn-secondary container"
          onClick={handleGoogleLogin}
        >
          <span className="fs-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-google me-2"
              viewBox="0 0 16 16"
            >
              <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
            </svg>
            구글계정으로 로그인
          </span>
        </button>
      </div>
    </>
  );
}
