import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../../api/instance';
import styles from './index.module.scss';

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const saveToLocalStorage = (data: any) => {
    localStorage.setItem('email', data.email);
    localStorage.setItem('userId', data.id);
    localStorage.setItem('username', data.name);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userImg', data.uploadFile);
    localStorage.setItem('refreshToken', data.refreshToken);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const userSigninInfos = { email, password };

    try {
      const response = await instance.post(
        'http://localhost:5001/users/login', userSigninInfos,
      );

      console.log("응답데이터",response)

      const userData = response.data;

      const { email, id, name, refreshToken, token, uploadFile } = userData;

      saveToLocalStorage({ email, id, name, refreshToken, token, uploadFile });

      console.log(userData)

      // 메인 경로로 이동
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        console.log('로그인 실패!', error.message);
      } else {
        console.log('로그인 실패! 알 수 없는 오류:', error);
      }
    }
  };

  return (
    <>
      <div className={styles.centerContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email"></label>
            <div className={styles.inputGroup}>
              <i className={styles.box1}></i>
              <input
                type="email"
                id="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password"></label>
            <div className={styles.inputGroup}>
              <i className={styles.box2}></i>
              <input
                type="password"
                id="password"
                placeholder="패스워드를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            SIGN IN
          </button>
        </form>
      </div>
    </>
  );
};

export default Signin;