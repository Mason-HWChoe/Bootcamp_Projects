import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  getAuth,
  updateProfile,
} from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/FormField';
import styles from './SignUpPage.module.css';

export default function SignUpPage() {
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUpNickname, setSignUpNickname] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const navigate = useNavigate();

  const auth = getAuth();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpEmail(e.target.value);
    setEmailChecked(false);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpPassword(e.target.value);
    setPasswordMismatch(e.target.value !== confirmPassword);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setConfirmPassword(e.target.value);
    setPasswordMismatch(e.target.value !== signUpPassword);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpNickname(e.target.value);
  };

  const handleEmailDuplicateCheck = async () => {
    const emailValid = validateEmail(signUpEmail);

    if (!emailValid) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    try {
      const methods = await fetchSignInMethodsForEmail(auth, signUpEmail);

      if (methods && methods.length > 0) {
        alert('이미 가입된 이메일 주소입니다. 다시 한 번 확인해주세요.');
      } else {
        alert('사용 가능한 이메일 주소입니다.');
        setEmailChecked(true);
      }
    } catch (error) {
      console.log('이메일 가용성 확인 중 오류 발생:', error);
    }
  };

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setFormSubmitted(true);

    if (!validateRequiredFields()) {
      alert('입력 사항을 모두 입력해주세요.');
      return;
    }

    if (!emailChecked) {
      alert('이메일 중복체크를 완료해주세요.');
      return;
    }

    if (signUpPassword.length < 6) {
      alert('비밀번호는 최소 6자리 이상이어야 합니다.');
      return;
    }

    if (signUpPassword !== confirmPassword) {
      setPasswordMismatch(true);
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!validateEmail(signUpEmail)) {
      alert('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        // Firebase에서 사용자 정보 업데이트
        updateProfile(user, { displayName: signUpNickname })
          .then(() => {
            alert(
              '축하합니다! 회원가입이 완료되었습니다! 로그인페이지로 이동합니다.',
            );
            navigate('/login');
          })
          .catch((error) => {
            console.log('프로필 업데이트 중 오류 발생:', error);
          });
      })
      .catch((error) => {
        console.log('사용자 생성 중 오류 발생:', error);
      });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateRequiredFields = () => {
    return (
      signUpEmail.trim() !== '' &&
      signUpPassword.trim() !== '' &&
      confirmPassword.trim() !== '' &&
      signUpNickname.trim() !== ''
    );
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
        invalid={formSubmitted && signUpEmail.trim() === ''}
      />
      <div className={styles.emailCheck}>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={handleEmailDuplicateCheck}
        >
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
        invalid={formSubmitted && signUpPassword.trim() === ''}
      />
      <div className={styles.passwordMessage}>
        최소 6자리 이상의 대소문자, 숫자, 특수문자로 구성해주세요
      </div>
      <FormField
        type="password"
        id="floatingConfirmPassword"
        placeholder="ConfirmPassword"
        label="ConfirmPassword"
        margin={4}
        onChange={handleConfirmPasswordChange}
        invalid={formSubmitted && confirmPassword.trim() === ''}
      />
      <div>
        {(formSubmitted || (confirmPassword && signUpPassword)) &&
          !passwordMismatch && (
            <div className={`${styles.passwordSuccess} text-success`}>
              {signUpPassword !== '' && '비밀번호가 일치합니다.'}
            </div>
          )}
        {formSubmitted ||
          (passwordMismatch && (
            <div className={`${styles.passwordError} text-danger`}>
              비밀번호가 일치하지 않습니다.
            </div>
          ))}
      </div>

      <FormField
        type="text"
        id="floatingNickname"
        placeholder="Nickname"
        label="Nickname"
        margin={4}
        onChange={handleNicknameChange}
        invalid={formSubmitted && signUpNickname.trim() === ''}
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
