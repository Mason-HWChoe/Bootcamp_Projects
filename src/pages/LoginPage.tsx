import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import FormField from '../components/FormField';
import styles from './LoginPage.module.css';

const firebaseConfig = {
  apiKey: 'AIzaSyBvU-e3rhwXEJcsUNoQ9y7lzHpwdlLhWPQ',
  authDomain: 'campingjua.firebaseapp.com',
  projectId: 'campingjua',
  storageBucket: 'campingjua.appspot.com',
  messagingSenderId: '839773153093',
  appId: '1:839773153093:web:757cc783d3b9fbf313402c',
  measurementId: 'G-BTSZFPYF25',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default function LoginPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const auth = getAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginPassword(e.target.value);
  };

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        console.log(error.code);
        // const errorCode = error.code;
        // const errorMessage = error.message;
      });
  };

  return (
    <>
      <div className={styles.loginContainer}>
        <h4 className="display-6 text-muted mb-3 fw-bold">로그인</h4>
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
        <button
          type="submit"
          className="btn btn-primary container mt-4 mb-2"
          onClick={handleLogin}
        >
          <span className="fs-4 fw-semibold">로그인</span>
        </button>
        <div className="text-end pe-2 text-decoration-underline">
          <Link to="/signup" className={styles.customLink}>
            회원가입
          </Link>
        </div>

        <p className="text-center mt-4 text-black-50">OR</p>

        <button type="submit" className="btn btn-secondary container">
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
