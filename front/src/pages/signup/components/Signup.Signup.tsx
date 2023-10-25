import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePutSignupData } from '../../../api/mutation/usePutSiginupData';
import { QueryClient } from '@tanstack/react-query';
import styles from './index.module.scss';

interface UserData {
  username: string;
  email: string;
  password: string;
}

interface InputFieldProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  boxStyle: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  boxStyle,
  onBlur,
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
        onBlur={onBlur}
      />
    </div>
  </div>
);

const Signup: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserData>({
    username: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const queryClient = new QueryClient();

  const signupMutation = usePutSignupData(queryClient);

  const signupInputForms = [
    {
      id: 'username',
      name: 'username',
      type: 'text',
      placeholder: '이름을 한글로만 입력하세요',
      value: userInfo.username,
      boxStyle: styles.box1,
    },
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: '이메일을 입력하세요',
      value: userInfo.email,
      boxStyle: styles.box1,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: '패스워드를 입력하세요',
      value: userInfo.password,
      boxStyle: styles.box2,
    },
    {
      id: 'confirmPassword',
      name: 'confirmPassword',
      type: 'password',
      placeholder: '패스워드를 다시 입력하세요',
      value: confirmPassword,
      boxStyle: styles.box2,
    },
  ];

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'username') {
      const han = /^[가-힣]+$/;
      if (!han.test(value)) {
        alert('한글만 입력해주세요.');
        setUserInfo(prev => ({ ...prev, username: '' }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'confirmPassword') {
      setConfirmPassword(value);
    } else {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (userInfo.password !== confirmPassword) {
      alert('패스워드가 일치하지 않습니다.');
      return;
    }

    signupMutation.mutate(userInfo);
  };

  return (
    <div className={styles.centerContainer}>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        {signupInputForms.map((input, index) => (
          <InputField
            key={index}
            id={input.id}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            value={input.value}
            onChange={handleChange}
            boxStyle={input.boxStyle}
            onBlur={handleBlur}
          />
        ))}
        <button type="submit" className={styles.submitButton}>
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default Signup;