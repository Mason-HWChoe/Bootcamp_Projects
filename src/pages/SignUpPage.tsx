import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useState } from 'react';
import FormField from '../components/FormField';
import styles from './SignUpPage.module.css';

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

export default function SignUpPage() {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const auth = getAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpPassword(e.target.value);
  };

  const handleSignUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
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
        // ..
      });
  };

  return (
    <div className={styles.signUpContainer}>
      <h4 className="display-6 text-muted mb-3 fw-bold">회원가입</h4>
      <FormField
        type="email"
        id="floatingEmail"
        placeholder="email"
        label="Email"
        margin={4}
        onChange={handleEmailChange}
      />
      <div className={styles.idCheck}>
        <button type="button" className="btn btn-secondary btn-sm">
          Email 중복체크
        </button>
      </div>

      <FormField
        type="password"
        id="floatingPassword"
        placeholder="Password"
        label="Password"
        margin={2}
        onChange={handlePasswordChange}
      />
      <FormField
        type="password"
        id="floatingConfirmPassword"
        placeholder="ConfirmPassword"
        label="ConfirmPassword"
        margin={4}
      />
      <div className={styles.passwordMessage}>
        비밀번호가 일치하지 않습니다.
      </div>
      <FormField
        type="text"
        id="floatingNickname"
        placeholder="Nickname"
        label="Nickname"
        margin={4}
      />
      <button
        type="submit"
        className="btn btn-primary container mt-4 mb-2"
        onClick={handleSignUp}
      >
        <span className="fs-4 fw-semibold">가입하기</span>
      </button>
    </div>
  );
}
