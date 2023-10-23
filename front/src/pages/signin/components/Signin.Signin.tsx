import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { instance } from '../../../api/instance';
import styles from './index.module.scss';

interface UserData {
  email: string;
  id: string;
  name: string;
  token: string;
  uploadFile: string;
  refreshToken: string;
}

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  boxStyle: string;
}

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const saveToLocalStorage = (data: UserData) => {
    localStorage.setItem('email', data.email);
    localStorage.setItem('userId', data.id);
    localStorage.setItem('username', data.name);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userImg', data.uploadFile);
    localStorage.setItem('refreshToken', data.refreshToken);
  };

  const mutation = useMutation(
    async (userSigninInfos: { email: string; password: string }) => {
      const response = await instance.post('http://localhost:5001/users/login', userSigninInfos);
      return response.data;
    },
    {
      // 로그인 성공
      onSuccess: (data: any) => {
        console.log('로그인 성공', data.data);
        saveToLocalStorage(data.data);
        navigate('/');
      },
      // 로그인 실패
      onError: (error: any) => {
        console.log('로그인 실패', error);
      },
    },
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const userSigninInfos = { email, password };
    mutation.mutate(userSigninInfos);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const InputField: React.FC<InputFieldProps> = ({
    id,
    name,
    type,
    placeholder,
    value,
    onChange,
    boxStyle,
  }) => (
    <div className={styles.formGroup}>
      <label htmlFor={id}></label>
      <div className={styles.inputGroup}>
        <i className={boxStyle}></i>
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.centerContainer}>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <InputField
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={handleEmailChange}
            boxStyle={styles.box1}
          />
          <InputField
            id="password"
            name="password"
            type="password"
            placeholder="패스워드를 입력하세요"
            value={password}
            onChange={handlePasswordChange}
            boxStyle={styles.box2}
          />
          <button type="submit" className={styles.submitButton}>
            SIGN IN
          </button>
        </form>
      </div>
    </>
  );
};

export default Signin;
